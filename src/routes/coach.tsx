import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles, User } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "AI Career Coach · MyJob Hunter" },
      { name: "description", content: "Chat with an AI career coach for interview prep and advice." },
    ],
  }),
  component: Coach,
});

type Msg = { id: string; role: "user" | "assistant"; content: string; ts: string };

const suggested = [
  "Prepare me for a software developer interview.",
  "Review my CV.",
  "Generate STAR interview answers.",
  "Explain REST APIs.",
  "What questions should I ask the interviewer?",
];

const initial: Msg[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi Jamie — I'm your AI career coach. I can help with interview prep, CV feedback, STAR answers, and technical concepts. What would you like to work on today?",
    ts: "just now",
  },
];

function fakeReply(prompt: string) {
  const p = prompt.toLowerCase();
  if (p.includes("star")) return "Great choice — the STAR framework has 4 parts:\n\n**Situation** — set the scene\n**Task** — what needed doing\n**Action** — what *you* did\n**Result** — the impact (numbers help)\n\nTry drafting one for a time you shipped something under pressure, and I'll refine it with you.";
  if (p.includes("cv") || p.includes("resume")) return "Paste your CV bullet points and I'll rewrite them using strong verbs, quantify impact, and align the wording to the role you're targeting.";
  if (p.includes("rest")) return "A REST API exposes resources over HTTP using verbs (GET/POST/PUT/DELETE). Key ideas: statelessness, resource URIs, correct status codes, and idempotency for retryable methods. Want a mock interview question on API design?";
  if (p.includes("interview")) return "Let's build a plan:\n\n1. Behavioural warm-ups (3 STAR stories)\n2. Role-specific technicals (data structures, systems)\n3. Company research summary\n4. Thoughtful questions to ask\n\nWhich company and role are we prepping for?";
  return "Good question — tell me a bit more about your context (role, company, timeline) and I'll tailor the guidance.";
}

function Coach() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text, ts: "now" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: fakeReply(text), ts: "now" }]);
      setTyping(false);
    }, 900);
  };

  return (
    <AppShell title="AI Career Coach" subtitle="Ask anything about your job search. Always verify AI answers before acting.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        <Card className="flex h-[calc(100vh-260px)] min-h-[500px] flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 shrink-0">
                  {m.role === "assistant" ? (
                    <AvatarFallback className="text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-muted"><User className="h-4 w-4" /></AvatarFallback>
                  )}
                </Avatar>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border bg-muted/40"
                }`}>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                  <div className={`mt-1 text-[10px] ${m.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.ts}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8"><AvatarFallback className="text-primary-foreground" style={{ background: "var(--gradient-primary)" }}><Sparkles className="h-4 w-4" /></AvatarFallback></Avatar>
                <div className="rounded-2xl border bg-muted/40 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t bg-background p-3">
            <div className="flex items-end gap-2">
              <Textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your career coach anything…"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                }}
                className="min-h-10 resize-none"
              />
              <Button onClick={() => send(input)} className="text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Suggested prompts</div>
              <div className="space-y-1.5">
                {suggested.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="w-full rounded-lg border bg-muted/30 px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-xs text-muted-foreground">
              <div className="mb-1 font-semibold text-foreground">Responsible AI</div>
              AI responses assist your career decisions — always review before acting on advice.
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}