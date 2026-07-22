import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Building2, Target, Lightbulb, Wrench, CalendarClock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AiOutputCard, AiSection } from "@/components/ai-output";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant · MyJob Hunter" },
      { name: "description", content: "Summarise job descriptions and company research with AI." },
    ],
  }),
  component: Research,
});

function Research() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const run = () => {
    setLoading(true);
    setDone(false);
    setTimeout(() => { setLoading(false); setDone(true); }, 1100);
  };

  return (
    <AppShell title="AI Research Assistant" subtitle="Paste anything — job description, About page, notes — and get a structured brief.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Input</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste a job description, an About Us page, interview notes, or a company article…"
              className="min-h-[280px] resize-none"
            />
            <div className="flex flex-wrap gap-2 text-xs">
              {["Job description", "Company About", "Interview notes", "Article"].map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
            <Button
              onClick={run}
              disabled={loading || text.trim().length < 20}
              className="w-full text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Analysing…" : "Summarise with AI"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {!done && !loading && (
            <Card>
              <CardContent className="grid place-items-center py-16 text-center">
                <Building2 className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <div className="text-sm font-medium">No summary yet</div>
                <div className="text-xs text-muted-foreground">Paste content and click Summarise.</div>
              </CardContent>
            </Card>
          )}
          {loading && (
            <Card><CardContent className="space-y-3 p-6">
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-4/6 animate-pulse rounded bg-muted" />
            </CardContent></Card>
          )}
          {done && (
            <AiOutputCard title="Research brief" onRegenerate={run}>
              <AiSection title="Company overview">
                Stripe is a global financial infrastructure platform enabling millions of businesses to accept payments, send payouts, and manage revenue online.
              </AiSection>
              <div className="grid gap-3 sm:grid-cols-2">
                <Panel icon={Building2} label="Industry">Fintech · Payments infrastructure</Panel>
                <Panel icon={Target} label="Mission">Grow the GDP of the internet.</Panel>
                <Panel icon={Wrench} label="Products">Payments, Billing, Connect, Radar, Atlas</Panel>
                <Panel icon={Lightbulb} label="Culture">High agency, writing-first, deep craft</Panel>
              </div>
              <AiSection title="Key skills required">
                <div className="flex flex-wrap gap-1.5">
                  {["TypeScript","React","API design","SQL","Distributed systems","Written comms"].map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </AiSection>
              <AiSection title="Interview preparation tips">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Study Stripe's engineering blog — writing samples matter here.</li>
                  <li>Practice systems questions: idempotency, retries, webhooks.</li>
                  <li>Prepare a written "brag doc" of shipped projects.</li>
                </ul>
              </AiSection>
              <AiSection title="Likely interview questions">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Design an idempotent payments API.</li>
                  <li>Tell me about a time you shipped something despite ambiguity.</li>
                  <li>How would you debug a spike in webhook failures?</li>
                </ul>
              </AiSection>
              <div className="grid gap-3 sm:grid-cols-2">
                <Panel icon={Wrench} label="Technologies mentioned">Ruby, Go, TypeScript, React, Postgres</Panel>
                <Panel icon={CalendarClock} label="Detected deadlines">Application closes Fri · Interview Tue 10am</Panel>
              </div>
              <AiSection title="Action items">
                <ul className="ml-4 list-disc space-y-1">
                  <li>Tailor CV to highlight API and payments work.</li>
                  <li>Draft a 1-page written response to their take-home prompt.</li>
                  <li>Book a 30-min mock interview by Wednesday.</li>
                </ul>
              </AiSection>
            </AiOutputCard>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Panel({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
        <Icon className="h-3.5 w-3.5" />{label}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}