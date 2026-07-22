import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Sparkles, Clock, Flag, Layers } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AiOutputCard } from "@/components/ai-output";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Planner · MyJob Hunter" },
      { name: "description", content: "Generate a daily and weekly job-search schedule with AI." },
    ],
  }),
  component: Planner,
});

const daily = [
  { time: "09:00", task: "Refresh CV & tailor cover letter for Stripe", tag: "Priority" },
  { time: "10:30", task: "Deep research: Stripe engineering culture & blog", tag: "Research" },
  { time: "13:00", task: "Practice 3 STAR answers (Leadership, Conflict, Failure)", tag: "Prep" },
  { time: "15:00", task: "Send 3 networking emails to Northwind alumni", tag: "Outreach" },
  { time: "17:00", task: "Review notes for tomorrow's Stripe interview", tag: "Prep" },
];

const weekly = [
  { day: "Mon", focus: "Applications & CV polish", load: 60 },
  { day: "Tue", focus: "Stripe interview + debrief", load: 90 },
  { day: "Wed", focus: "Company research (3 targets)", load: 50 },
  { day: "Thu", focus: "Northwind assessment", load: 80 },
  { day: "Fri", focus: "Networking & follow-ups", load: 40 },
  { day: "Sat", focus: "Portfolio project", load: 55 },
  { day: "Sun", focus: "Rest + light review", load: 20 },
];

function Planner() {
  const [generated, setGenerated] = useState(true);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 900);
  };

  return (
    <AppShell
      title="AI Planner"
      subtitle="Tell the AI about your week and it builds a personalised schedule."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Your inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Interview dates</Label>
              <Input placeholder="e.g. Stripe – Tue 10am, Northwind – Thu 2pm" />
            </div>
            <div className="grid gap-2">
              <Label>Application deadlines</Label>
              <Input placeholder="e.g. Acme – Fri, Globex – Dec 5" />
            </div>
            <div className="grid gap-2">
              <Label>Weekly goals</Label>
              <Textarea rows={2} placeholder="Apply to 5 roles, complete 1 project, network with 3 alumni…" />
            </div>
            <div className="grid gap-2">
              <Label>Availability</Label>
              <Input placeholder="Weekdays 9am–6pm, weekends light" />
            </div>
            <div className="grid gap-2">
              <Label>Career objectives</Label>
              <Textarea rows={2} placeholder="Land a graduate SWE role at a product-led company by Q1." />
            </div>
            <Button
              className="w-full text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
              disabled={loading}
              onClick={generate}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Building your plan…" : "Generate schedule"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          {loading && (
            <Card><CardContent className="space-y-3 p-6">
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
            </CardContent></Card>
          )}

          {!loading && generated && (
            <>
              <AiOutputCard title="Daily planner" onRegenerate={generate}>
                <div className="relative space-y-3 pl-4">
                  <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
                  {daily.map((d) => (
                    <div key={d.time} className="relative">
                      <div className="absolute -left-3 top-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_0_3px_var(--background)]" />
                      <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
                        <div className="flex w-16 shrink-0 items-center gap-1 text-xs font-semibold text-primary">
                          <Clock className="h-3.5 w-3.5" />{d.time}
                        </div>
                        <div className="flex-1 text-sm">{d.task}</div>
                        <Badge variant="outline" className="text-[10px]">{d.tag}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </AiOutputCard>

              <AiOutputCard title="Weekly planner">
                <div className="grid gap-2 sm:grid-cols-2">
                  {weekly.map((w) => (
                    <div key={w.day} className="rounded-lg border bg-muted/30 p-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{w.day}</div>
                        <span className="text-xs text-muted-foreground">{w.load}% load</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{w.focus}</div>
                      <Progress value={w.load} className="mt-2 h-1.5" />
                    </div>
                  ))}
                </div>
              </AiOutputCard>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <Flag className="mb-2 h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground">Task priorities</div>
                    <div className="mt-1 text-lg font-bold">3 high · 5 med</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <CalendarClock className="mb-2 h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground">Prep timeline</div>
                    <div className="mt-1 text-lg font-bold">2 days to Stripe</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <Layers className="mb-2 h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground">Est. workload</div>
                    <div className="mt-1 text-lg font-bold">~28 hrs / week</div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}