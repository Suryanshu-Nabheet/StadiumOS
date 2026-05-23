"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { useStadium } from "@/hooks/use-stadium";
import Image from "next/image";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  source?: string;
}

const suggestions = [
  "Which gate is overloaded?",
  "Predict next congestion zone",
  "Show safest evacuation path",
  "Generate incident report",
  "Where should security move?",
];

export function ChatPanel() {
  const { snapshot, emergencies } = useStadium();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "StadiumOS AI is online with live telemetry. Ask about gates, congestion, evacuation, or security positioning.",
      source: "local",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    const query = text.trim();
    if (!query || loading) return;

    setMessages((m) => [...m, { role: "user", content: query }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          context: { snapshot, emergencies },
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.text ?? "Unable to process request.",
          source: data.source,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Panel className="flex h-[calc(100vh-12rem)] flex-col" padding="md">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <Image src="/favicon.svg" alt="" width={40} height={40} />
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Operator assistant
          </h2>
          <p className="text-xs text-slate-500">
            Gemini when configured · local fallback otherwise
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 py-3">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => sendMessage(s)}
            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-sky-500 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-800"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.source && msg.role === "assistant" && (
                <p className="mt-2 text-[10px] opacity-70">Source: {msg.source}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-xs text-slate-500">Analyzing live data…</p>
        )}
      </div>

      <form
        className="mt-4 flex gap-2 border-t border-slate-100 pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about stadium operations…"
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
        <Button type="submit" size="icon" disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Panel>
  );
}
