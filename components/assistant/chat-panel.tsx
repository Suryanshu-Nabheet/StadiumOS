"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useStadium } from "@/hooks/use-stadium";
import { Bot, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        "**StadiumOS AI online.** I have live telemetry for all gates, stands, and incidents. How can I assist operations?",
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
        {
          role: "assistant",
          content: "Connection error. Local fallback unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard glow className="flex h-[calc(100vh-12rem)] flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">AI Command Assistant</h2>
          <p className="text-xs text-zinc-500">
            Gemini-powered · local fallback active
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 py-3">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => sendMessage(s)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-zinc-300 hover:border-cyan-500/30 hover:text-cyan-300"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-600/30 text-cyan-50"
                    : "border border-white/10 bg-black/40 text-zinc-200"
                }`}
              >
                {msg.role === "assistant" && (
                  <Sparkles className="mb-2 h-3 w-3 text-purple-400" />
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
                {msg.source && (
                  <p className="mt-2 text-[10px] text-zinc-600">via {msg.source}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <p className="animate-pulse text-xs text-cyan-400">AI analyzing live telemetry…</p>
        )}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask StadiumOS AI…"
          className="flex-1 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none"
        />
        <Button type="submit" size="icon" disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </GlassCard>
  );
}
