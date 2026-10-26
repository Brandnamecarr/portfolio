import { useCallback, useEffect, useState } from "react";
import { getGoogleStatus, startGoogleLogin } from "../api/client";
import type { GoogleStatus } from "../common/types";

interface GoogleConnectProps {
  onError: (message: string | null) => void;
}

/**
 * Shows the server's Google sign-in state, with a button that runs the OAuth
 * sign-in in a popup. Google redirects the popup to the API server, which saves
 * the token, tells this window how it went, and closes the popup.
 */
export default function GoogleConnect({ onError }: GoogleConnectProps) {
  const [status, setStatus] = useState<GoogleStatus | null>(null);
  const [connecting, setConnecting] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setStatus(await getGoogleStatus());
    } catch (err) {
      onError(err instanceof Error ? err.message : "Couldn't check Google sign-in.");
    }
  }, [onError]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Fallback for when the popup can't report back: re-check on returning to this tab.
  useEffect(() => {
    if (!status?.enabled || status.account) return;
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [status, refresh]);

  async function handleConnect() {
    onError(null);
    // Open the popup synchronously in the click handler so it isn't blocked.
    const popup = window.open("", "google-auth", "width=500,height=650");
    if (!popup) {
      onError("Allow popups for this site to connect Google.");
      return;
    }
    setConnecting(true);

    try {
      popup.location.href = await startGoogleLogin();
    } catch (err) {
      popup.close();
      setConnecting(false);
      onError(err instanceof Error ? err.message : "Couldn't start Google sign-in.");
      return;
    }

    const onMessage = (event: MessageEvent) => {
      if (event.source !== popup || event.data?.type !== "google-auth") return;
      if (!event.data.ok) onError(event.data.message);
    };
    window.addEventListener("message", onMessage);

    const timer = window.setInterval(() => {
      if (!popup.closed) return;
      window.clearInterval(timer);
      window.removeEventListener("message", onMessage);
      setConnecting(false);
      void refresh();
    }, 500);
  }

  if (!status?.enabled) return null;

  if (status.account) {
    return <span className="google-connect__account">Google: {status.account}</span>;
  }

  return (
    <button className="google-connect__button" onClick={handleConnect} disabled={connecting}>
      {connecting ? "Waiting for Google…" : "Connect Google"}
    </button>
  );
}
