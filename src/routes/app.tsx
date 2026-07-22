import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  CalendarCheck,
  Clock,
  Target,
  Plus,
  Search,
  Mail,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Dashboard · MyJob Hunter" },
      { name: "description", content: "Your AI-powered career command center." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Applications Submitted", value: 24, delta: "+12%", up: true, icon: Briefcase, tone: "text-primary" },
  { label: "Interviews Scheduled", value: 5, delta: "+2 this week", up: true, icon: CalendarCheck, tone: "text-[color:var(--success)]" },
  { label: "Pending Applications", value: 9, delta: "-1", up: false, icon: Clock, tone: "text-[color:var(--warning)]" },
  { label: "Weekly Goals", value: "7 / 10", delta: "70% done", up: true, icon: Target, tone: "text-[color:var(--info)]" },
];

const tasks = [
  { text: "Update CV with latest project", done: true },
  { text: "Research Company: Northwind Labs", done: true },
  { text: "Prepare for Stripe technical interview", done: false },
  { text: "Send follow-up email to Acme Corp", done: false },
  { text: "Practice 3 STAR interview answers", done: false },
];

const recs = [
  { text: "Follow up on your Acme Corp application — it's been 7 days.", tag: "Action" },
  { text: "You have a Stripe interview tomorrow. Review their engineering blog.", tag: "Reminder" },
  { text: "Research Northwind Labs before your Thursday screen.", tag: "Prep" },
];

type Status = "Applied" | "Interview" | "Assessment" | "Offer" | "Rejected" | "Saved";
const statusStyles: Record<Status, string> = {
  Applied: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Interview: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Assessment: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Offer: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Rejected: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Saved: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

const applications: {
  company: string;
  position: string;
  status: Status;
  deadline: string;
  priority: "High" | "Medium" | "Low";
}[] = [
  { company: "Stripe", position: "Graduate SWE", status: "Interview", deadline: "Tomorrow", priority: "High" },
  { company: "Acme Corp", position: "Junior Developer", status: "Applied", deadline: "In 3 days", priority: "Medium" },
  { company: "Northwind Labs", position: "Data Analyst", status: "Assessment", deadline: "Fri, Nov 28", priority: "High" },
  { company: "Globex", position: "Frontend Engineer", status: "Saved", deadline: "Dec 05", priority: "Low" },
  { company: "Initech", position: "Product Analyst", status: "Rejected", deadline: "—", priority: "Low" },
];

function Dashboard() {
  return (
    <AppShell
      title="Welcome back, Jamie 👋"
      subtitle="Let's get one step closer to your dream job."
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/applications"><Plus className="mr-1.5 h-4 w-4" /> Add Application</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/research"><Search className="mr-1.5 h-4 w-4" /> Research Company</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/email"><Mail className="mr-1.5 h-4 w-4" /> Generate Email</Link>
          </Button>
          <Button asChild className="text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <Link to="/coach"><MessageSquare className="mr-1.5 h-4 w-4" /> Chat with AI</Link>
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-primary/10 ${s.tone}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-[color:var(--success)]" : "text-muted-foreground"}`}>
                  {s.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {s.delta}
                </div>
              </div>
              <div className="mt-4 text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Today's tasks</CardTitle>
              <p className="text-xs text-muted-foreground">Generated by AI based on your priorities</p>
            </div>
            <Badge variant="secondary"><Sparkles className="mr-1 h-3 w-3" />AI</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {tasks.map((t) => (
              <div key={t.text} className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2.5 transition-colors hover:bg-muted/60">
                <CheckCircle2 className={`h-5 w-5 shrink-0 ${t.done ? "text-[color:var(--success)]" : "text-muted-foreground/50"}`} />
                <span className={`flex-1 text-sm ${t.done ? "text-muted-foreground line-through" : ""}`}>{t.text}</span>
              </div>
            ))}
            <div className="pt-2">
              <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                <span>Daily progress</span><span>2 / 5</span>
              </div>
              <Progress value={40} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">AI Recommendations</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="space-y-3">
            {recs.map((r) => (
              <div key={r.text} className="rounded-lg border bg-gradient-to-br from-primary/5 to-transparent p-3">
                <Badge variant="outline" className="mb-1.5 text-[10px]">{r.tag}</Badge>
                <p className="text-sm leading-snug">{r.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recent applications</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/applications">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((a) => (
                  <TableRow key={a.company}>
                    <TableCell className="font-medium">{a.company}</TableCell>
                    <TableCell className="text-muted-foreground">{a.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[a.status]}>{a.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{a.deadline}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={a.priority === "High" ? "destructive" : a.priority === "Medium" ? "default" : "secondary"}>
                        {a.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
