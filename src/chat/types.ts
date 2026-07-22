export type ChatStatus = {
  available: boolean;
  reason: "" | "disabled" | "budget_reached";
  model: string;
  maxMessageChars: number;
  conversationMaxTurns: number;
  retryAt?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  streaming?: boolean;
};

export type StreamDone = {
  conversationId: string;
  finishReason?: string;
  remainingTurns: number;
};

export type StreamHandlers = {
  onConversation: (conversationId: string) => void;
  onChunk: (text: string) => void;
  onDone: (result: StreamDone) => void;
};
