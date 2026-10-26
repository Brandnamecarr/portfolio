export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GoogleStatus {
  enabled: boolean;
  account: string | null;
}
