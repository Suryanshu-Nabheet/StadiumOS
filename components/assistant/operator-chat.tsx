"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSidebarTrigger } from "@/components/layout/animated-sidebar-trigger";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { useStadium } from "@/hooks/use-stadium";
import {
  postAssistantMessage,
  type ChatMessage,
} from "@/lib/assistant-client";
import { cn } from "@/lib/utils";
import { ArrowUp, Copy, Globe, Loader2, Plus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "StadiumOS operator AI — synced to live telemetry. Ask about gates, crowd, incidents, or say **hi** to start.",
  source: "local",
};

function newId() {
  return crypto.randomUUID();
}

function AssistantMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none text-foreground prose-p:my-1 prose-ul:my-1 prose-li:my-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export function OperatorChat({ className }: { className?: string }) {
  const { snapshot, emergencies } = useStadium();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geminiReady, setGeminiReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d: { features?: { gemini?: boolean } }) =>
        setGeminiReady(Boolean(d.features?.gemini)),
      )
      .catch(() => setGeminiReady(false));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const query = text.trim();
      if (!query || isLoading) return;

      setError(null);
      setPrompt("");
      setIsLoading(true);

      setMessages((prev) => [
        ...prev,
        { id: newId(), role: "user", content: query },
      ]);

      try {
        const { text: reply, source } = await postAssistantMessage(query, {
          snapshot,
          emergencies,
        });
        setMessages((prev) => [
          ...prev,
          { id: newId(), role: "assistant", content: reply, source },
        ]);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Connection error. Try again.";
        setError(msg);
        setMessages((prev) => [
          ...prev,
          {
            id: newId(),
            role: "assistant",
            content: `**Request failed:** ${msg}`,
            source: "local",
          },
        ]);
      } finally {
        setIsLoading(false);
        textareaRef.current?.focus();
      }
    },
    [emergencies, isLoading, snapshot],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(prompt);
    }
  };

  const resetChat = () => {
    setMessages([WELCOME]);
    setPrompt("");
    setError(null);
  };

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col bg-background",
        className,
      )}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-white px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <AnimatedSidebarTrigger />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-slate-900">
                Operator assistant
              </h1>
              <LiveIndicator />
            </div>
            <p className="text-xs text-slate-500">
              {geminiReady
                ? "Gemini · live stadium telemetry"
                : "Local AI · set GEMINI_API_KEY in .env.local"}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetChat}
          disabled={isLoading}
          className="shrink-0 gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          New chat
        </Button>
      </header>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto bg-[var(--background)] px-4 py-5 md:px-6"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          {messages.map((message) => {
            const isUser = message.role === "user";
            return (
              <div
                key={message.id}
                className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
              >
                {isUser ? (
                  <div className="group max-w-[85%] sm:max-w-[75%]">
                    <div className="rounded-3xl bg-slate-100 px-5 py-2.5 text-[15px] leading-relaxed text-slate-900">
                      {message.content}
                    </div>
                    <button
                      type="button"
                      title="Copy"
                      onClick={() => void navigator.clipboard.writeText(message.content)}
                      className="mt-1 ml-auto flex opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  </div>
                ) : (
                  <div className="group w-full max-w-full">
                    <AssistantMarkdown content={message.content} />
                    <div className="mt-1 flex items-center gap-2">
                      {message.source && (
                        <span className="text-[10px] text-slate-400">
                          {message.source === "gemini" ? "Gemini" : "Local AI"}
                        </span>
                      )}
                      <button
                        type="button"
                        title="Copy"
                        onClick={() =>
                          void navigator.clipboard.writeText(message.content)
                        }
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
              Thinking…
            </div>
          )}
        </div>
      </div>

      <footer className="shrink-0 border-t border-border bg-white px-4 py-3 md:px-6">
        <div className="mx-auto w-full max-w-3xl">
          {error && (
            <p className="mb-2 text-center text-xs text-red-600">{error}</p>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about stadium operations…"
              disabled={isLoading}
              rows={1}
              className="max-h-32 min-h-[44px] w-full resize-none bg-transparent px-3 pt-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400"
            />
            <div className="mt-2 flex items-center justify-between gap-2 px-1 pb-1">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full"
                  disabled={isLoading}
                  onClick={() => void sendMessage("Which gate is overloaded?")}
                >
                  <Globe className="h-4 w-4" />
                  Quick scan
                </Button>
              </div>
              <Button
                type="button"
                size="icon"
                disabled={!prompt.trim() || isLoading}
                onClick={() => void sendMessage(prompt)}
                className="size-9 rounded-full"
                aria-label="Send"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
