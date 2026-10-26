import { useState } from "react";
import PasswordGate from "../components/PasswordGate";
import ChatBox from "../components/ChatBox";
import DailyReport from "../components/DailyReport";
import "./AssistantPage.css";

type Tab = "chat" | "report";

const TABS: { id: Tab; label: string }[] = [
  { id: "chat", label: "Chat" },
  { id: "report", label: "Daily report" },
];

export default function AssistantPage() {
  const [tab, setTab] = useState<Tab>("chat");

  return (
    <PasswordGate>
      <div className="assistant-page">
        <div className="assistant-page__tabs" role="tablist">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={`assistant-page__tab${tab === id ? " assistant-page__tab--active" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Both stay mounted so switching tabs keeps the chat history. */}
        <div role="tabpanel" hidden={tab !== "chat"}>
          <ChatBox />
        </div>
        <div role="tabpanel" hidden={tab !== "report"}>
          <DailyReport />
        </div>
      </div>
    </PasswordGate>
  );
}
