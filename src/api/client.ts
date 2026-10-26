import type { GoogleStatus } from "../common/types";

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

async function authedRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getSessionToken();
  if (!token) {
    throw new Error("Not authenticated.");
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (res.status === 401) {
    clearSessionToken();
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    throw new Error(data.detail ?? data.error ?? "Request failed.");
  }

  return data;
}

export async function sendChatMessage(message: string): Promise<string> {
  const data = await authedRequest<{ reply: string }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
  return data.reply;
}

export function getGoogleStatus(): Promise<GoogleStatus> {
  return authedRequest<GoogleStatus>("/api/google/status");
}

/** Returns the Google consent URL; Google then redirects to the API server. */
export async function startGoogleLogin(): Promise<string> {
  const data = await authedRequest<{ url: string }>("/api/google/login", { method: "POST" });
  return data.url;
}
