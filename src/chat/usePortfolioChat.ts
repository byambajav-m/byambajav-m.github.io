import { useCallback, useEffect, useRef, useState } from "react";
import { ChatAPIError, createSession, getChatStatus, streamChat } from "./chatApi";
import type { ChatMessage, ChatStatus } from "./types";

const SESSION_KEY = "portfolio-chat-session";

function messageID(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function friendlyError(error: unknown): string {
  if (error instanceof ChatAPIError) {
    if (error.code === "budget_reached" || error.code === "chat_disabled") {
      return "The portfolio assistant is resting for now. You can still explore my work or contact me directly.";
    }
    if (error.code === "provider_rate_limited") {
      return "The assistant is busy right now. Please try again in a moment.";
    }
    if (error.code === "conversation_limit") {
      return "This conversation has reached its limit. Start a new conversation to continue.";
    }
    return error.message;
  }
  return "I couldn't reach the portfolio assistant. Please check that the local backend is running.";
}

export function usePortfolioChat() {
  const [status, setStatus] = useState<ChatStatus | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [remainingTurns, setRemainingTurns] = useState<number | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getChatStatus(controller.signal)
      .then((nextStatus) => {
        setStatus(nextStatus);
        if (!nextStatus.available) setIsOpen(false);
      })
      .catch(() => setStatus(null));
    return () => controller.abort();
  }, []);

  const getSession = useCallback(async (signal: AbortSignal, renew = false) => {
    if (!renew) {
      const existing = window.sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
    }
    const token = await createSession(signal);
    window.sessionStorage.setItem(SESSION_KEY, token);
    return token;
  }, []);

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim();
      if (!message || isStreaming || !status?.available) return;

      const userMessage: ChatMessage = { id: messageID(), role: "user", text: message };
      const assistantID = messageID();
      setMessages((current) => [
        ...current,
        userMessage,
        { id: assistantID, role: "assistant", text: "", streaming: true },
      ]);
      setError(null);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;
      const appendChunk = (text: string) => {
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantID ? { ...item, text: item.text + text } : item,
          ),
        );
      };

      const run = async (renewSession: boolean) => {
        const token = await getSession(controller.signal, renewSession);
        await streamChat(
          token,
          message,
          conversationId,
          {
            onConversation: setConversationId,
            onChunk: appendChunk,
            onDone: (result) => {
              if (result.conversationId) setConversationId(result.conversationId);
              setRemainingTurns(result.remainingTurns);
            },
          },
          controller.signal,
        );
      };

      try {
        try {
          await run(false);
        } catch (requestError) {
          if (requestError instanceof ChatAPIError && requestError.status === 401) {
            window.sessionStorage.removeItem(SESSION_KEY);
            await run(true);
          } else {
            throw requestError;
          }
        }
      } catch (requestError) {
        if (!(requestError instanceof DOMException && requestError.name === "AbortError")) {
          setError(friendlyError(requestError));
        }
      } finally {
        setMessages((current) =>
          current
            .map((item) =>
              item.id === assistantID ? { ...item, streaming: false } : item,
            )
            .filter((item) => item.id !== assistantID || item.text.length > 0),
        );
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [conversationId, getSession, isStreaming, status?.available],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const newConversation = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setConversationId(null);
    setRemainingTurns(null);
    setError(null);
  }, []);

  return {
    status,
    isAvailable: status?.available === true,
    isOpen,
    setIsOpen,
    messages,
    remainingTurns,
    isStreaming,
    error,
    sendMessage,
    stop,
    newConversation,
  };
}

export type PortfolioChatController = ReturnType<typeof usePortfolioChat>;
