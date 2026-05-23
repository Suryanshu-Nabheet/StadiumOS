import { OperatorChat } from "@/components/assistant/operator-chat";

export const dynamic = "force-dynamic";

export const metadata = { title: "AI Assistant" };

export default function AssistantPage() {
  return <OperatorChat className="h-full min-h-0 flex-1" />;
}
