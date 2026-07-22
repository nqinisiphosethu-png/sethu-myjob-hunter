import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Mail } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AiOutputCard, AiSection } from "@/components/ai-output";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator · MyJob Hunter" },
      { name: "description", content: "Generate polished, professional job-search emails." },
    ],
  }),
  component: EmailPage,
});

const emailTypes = [
  "Follow-up after application",
  "Interview confirmation",
  "Interview thank-you",
  "Networking email",
  "Request application status",
  "Request feedback",
  "Accept interview invitation",
  "Decline interview professionally",
];
const tones = ["Professional", "Friendly", "Persuasive", "Confident"];

function EmailPage() {
  const [type, setType] = useState(emailTypes[0]);
  const [tone, setTone] = useState(tones[0]);
  const [company, setCompany] = useState("Stripe");
  const [recruiter, setRecruiter] = useState("Alex Morgan");
  const [position, setPosition] = useState("Graduate Software Developer");
  const [notes, setNotes] = useState("Applied 7 days ago, would like a polite status update.");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(true);

  const generate = () => {
    setLoading(true); setDone(false);
    setTimeout(() => { setLoading(false); setDone(true); }, 900);
  };

  const subject = `Following up on my ${position} application`;
  const body = `Hi ${recruiter || "there"},

I hope you're well. I'm writing to follow up on my application for the ${position} role at ${company}, which I submitted last week.

I remain very enthusiastic about the opportunity and would love to contribute to the team. If it would be helpful, I'd be happy to share additional work samples or answer any questions.

Thank you for your time and consideration — I look forward to hearing from you.

Best regards,
Jamie Doe`;

  return (
    <AppShell title="Smart Email Generator" subtitle="Craft professional emails in seconds — always review before sending.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Email inputs</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-1.5">
              <Label>Email type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{emailTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{tones.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5"><Label>Company</Label><Input value={company} onChange={(e) => setCompany(e.target.value)} /></div>
              <div className="grid gap-1.5"><Label>Recruiter</Label><Input value={recruiter} onChange={(e) => setRecruiter(e.target.value)} /></div>
            </div>
            <div className="grid gap-1.5"><Label>Position</Label><Input value={position} onChange={(e) => setPosition(e.target.value)} /></div>
            <div className="grid gap-1.5"><Label>Additional info</Label><Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
            <Button onClick={generate} disabled={loading} className="w-full text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="mr-2 h-4 w-4" />{loading ? "Writing…" : "Generate email"}
            </Button>
          </CardContent>
        </Card>

        <div>
          {loading ? (
            <Card><CardContent className="space-y-3 p-6">
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
              <div className="h-3 w-4/6 animate-pulse rounded bg-muted" />
              <div className="h-3 w-3/6 animate-pulse rounded bg-muted" />
            </CardContent></Card>
          ) : done ? (
            <AiOutputCard title="Generated email" copyText={`Subject: ${subject}\n\n${body}`} onRegenerate={generate}>
              <AiSection title="Subject line">
                <div className="rounded-md border bg-muted/40 p-2.5 font-medium">{subject}</div>
              </AiSection>
              <AiSection title="Body">
                <pre className="whitespace-pre-wrap rounded-md border bg-muted/40 p-3 font-sans text-sm leading-relaxed">{body}</pre>
              </AiSection>
              <div className="flex items-center gap-2 rounded-md border bg-primary/5 p-2.5 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5 text-primary" />
                Tip: personalise the opening line with a specific detail about the recruiter or company.
              </div>
            </AiOutputCard>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}