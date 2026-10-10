import { useState, type FormEvent, type ReactNode } from "react";
import { login } from "../api/client";
import "./PasswordGate.css";

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(password);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="password-gate">
      <form className="password-gate__form" onSubmit={handleSubmit}>
        <h2>Locked</h2>
        <p>Enter the password to chat with the AI chief of staff.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          disabled={submitting}
        />
        {error && <p className="password-gate__error">{error}</p>}
        <button type="submit" disabled={submitting || password.length === 0}>
          {submitting ? "Checking..." : "Unlock"}
        </button>
      </form>
    </div>
  );
}
