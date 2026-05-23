import { ChatPanel } from "@/components/assistant/chat-panel";

export const metadata = { title: "AI Assistant" };

export default function AssistantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">AI Command Assistant</h2>
        <p className="text-sm text-zinc-500">
          Gemini-powered operator copilot with local fallback
        </p>
      </div>
      <ChatPanel />
    </div>
  );
}
