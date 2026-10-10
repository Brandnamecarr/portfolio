import PasswordGate from "../components/PasswordGate";
import ChatBox from "../components/ChatBox";

export default function AssistantPage() {
  return (
    <PasswordGate>
      <ChatBox />
    </PasswordGate>
  );
}
