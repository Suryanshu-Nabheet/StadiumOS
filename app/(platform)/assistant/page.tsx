import { ChatPanel } from "@/components/assistant/chat-panel";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "AI Assistant" };

export default function AssistantPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operator assistant"
        description="Natural-language queries over live stadium telemetry"
      />
      <ChatPanel />
    </div>
  );
}
