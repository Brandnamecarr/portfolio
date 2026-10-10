import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendChatMessage } from "../api/client";
import type { ChatMessage } from "../common/types";
import "./ChatBox.css";

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setSending(true);

    try {
      const reply = await sendChatMessage(trimmed);
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-box">
      <div className="chat-box__header">
        <h2>Chief of Staff</h2>
      </div>

      <div className="chat-box__messages" ref={scrollRef}>
        {messages.length === 0 && (
          <p className="chat-box__empty">Send a message to get started.</p>
        )}
        {messages.map((message, i) => (
          <div key={i} className={`chat-box__message chat-box__message--${message.role}`}>
            {message.content}
          </div>
        ))}
        {sending && <div className="chat-box__message chat-box__message--assistant chat-box__message--pending">Thinking…</div>}
      </div>

      {error && <p className="chat-box__error">{error}</p>}

      <form className="chat-box__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message your chief of staff..."
          disabled={sending}
        />
        <button type="submit" disabled={sending || input.trim().length === 0}>
          Send
        </button>
      </form>
    </div>
  );
}
