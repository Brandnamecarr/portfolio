const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const SESSION_STORAGE_KEY = "portfolio_session_token";

export function getSessionToken(): string | null {
  return sessionStorage.getItem(SESSION_STORAGE_KEY);
}

export function setSessionToken(token: string): void {
  sessionStorage.setItem(SESSION_STORAGE_KEY, token);
}

export function clearSessionToken(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

export async function login(password: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail ?? "Login failed.");
  }

  setSessionToken(data.token);
  return data.token;
}

export async function sendChatMessage(message: string): Promise<string> {
  const token = getSessionToken();
  if (!token) {
    throw new Error("Not authenticated.");
  }

  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  if (res.status === 401) {
    clearSessionToken();
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    throw new Error(data.detail ?? data.error ?? "Failed to send message.");
  }

  return data.reply;
}
