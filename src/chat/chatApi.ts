import type { ChatStatus, StreamHandlers } from "./types";

const configuredBaseURL = import.meta.env.VITE_CHAT_API_URL?.trim();
const API_BASE_URL = (
  configuredBaseURL || "http://127.0.0.1:8080"
).replace(/\/$/, "");

type ErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    retryAt?: string;
  };
};

export class ChatAPIError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly retryAt?: string,
  ) {
    super(message);
    this.name = "ChatAPIError";
  }
}

async function responseError(response: Response): Promise<ChatAPIError> {
  let payload: ErrorPayload | undefined;
  try {
    payload = (await response.json()) as ErrorPayload;
  } catch {
    // The fallback below handles non-JSON proxy and network responses.
  }
  return new ChatAPIError(
    response.status,
    payload?.error?.code || "request_failed",
    payload?.error?.message || "The portfolio assistant is unavailable.",
    payload?.error?.retryAt,
  );
}

export async function getChatStatus(signal?: AbortSignal): Promise<ChatStatus> {
  const response = await fetch(`${API_BASE_URL}/v1/chat/status`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw await responseError(response);
  return (await response.json()) as ChatStatus;
}

export async function createSession(signal?: AbortSignal): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/v1/sessions`, {
    method: "POST",
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw await responseError(response);
  const body = (await response.json()) as { token: string };
  return body.token;
}

function parseEvent(frame: string): { event: string; data: string } | null {
  let event = "message";
  const data: string[] = [];
  for (const line of frame.split("\n")) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    if (line.startsWith("data:")) data.push(line.slice(5).trimStart());
  }
  return data.length > 0 ? { event, data: data.join("\n") } : null;
}

export async function streamChat(
  token: string,
  message: string,
  conversationId: string | null,
  handlers: StreamHandlers,
  signal: AbortSignal,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/v1/chat/stream`, {
    method: "POST",
    signal,
    headers: {
      Accept: "text/event-stream",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      ...(conversationId ? { conversationId } : {}),
    }),
  });
  if (!response.ok) throw await responseError(response);
  if (!response.body) {
    throw new ChatAPIError(502, "streaming_unavailable", "Streaming is unavailable in this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const consume = (frame: string) => {
    const parsed = parseEvent(frame);
    if (!parsed) return;
    const payload = JSON.parse(parsed.data) as Record<string, unknown>;
    if (parsed.event === "meta" && typeof payload.conversationId === "string") {
      handlers.onConversation(payload.conversationId);
    } else if (parsed.event === "chunk" && typeof payload.text === "string") {
      handlers.onChunk(payload.text);
    } else if (parsed.event === "done") {
      handlers.onDone({
        conversationId: String(payload.conversationId || ""),
        finishReason: typeof payload.finishReason === "string" ? payload.finishReason : undefined,
        remainingTurns: Number(payload.remainingTurns || 0),
      });
    } else if (parsed.event === "error") {
      throw new ChatAPIError(
        502,
        String(payload.code || "stream_failed"),
        String(payload.message || "The response was interrupted."),
      );
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value, { stream: !done }).replace(/\r\n/g, "\n");
    let boundary = buffer.indexOf("\n\n");
    while (boundary >= 0) {
      consume(buffer.slice(0, boundary));
      buffer = buffer.slice(boundary + 2);
      boundary = buffer.indexOf("\n\n");
    }
    if (done) break;
  }
  if (buffer.trim()) consume(buffer);
}
