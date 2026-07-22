import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Trash2, Pencil, Clock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications Tracker · MyJob Hunter" },
      { name: "description", content: "Track every job application in one place." },
    ],
  }),
  component: Applications,
});

type Status = "Applied" | "Interview" | "Assessment" | "Offer" | "Rejected" | "Saved";
type Priority = "High" | "Medium" | "Low";

type App = {
  id: string;
  company: string;
  position: string;
  deadline: string;
  status: Status;
  priority: Priority;
  progress: number;
};

const seed: App[] = [
  { id: "1", company: "Stripe", position: "Graduate SWE", deadline: "2026-07-24", status: "Interview", priority: "High", progress: 70 },
  { id: "2", company: "Acme Corp", position: "Junior Developer", deadline: "2026-07-26", status: "Applied", priority: "Medium", progress: 30 },
  { id: "3", company: "Northwind Labs", position: "Data Analyst", deadline: "2026-07-31", status: "Assessment", priority: "High", progress: 55 },
  { id: "4", company: "Globex", position: "Frontend Engineer", deadline: "2026-08-05", status: "Saved", priority: "Low", progress: 10 },
  { id: "5", company: "Umbrella", position: "Product Analyst", deadline: "2026-08-12", status: "Offer", priority: "High", progress: 100 },
  { id: "6", company: "Initech", position: "QA Engineer", deadline: "2026-07-15", status: "Rejected", priority: "Low", progress: 100 },
];

const statusStyles: Record<Status, string> = {
  Applied: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Interview: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Assessment: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Offer: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Rejected: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Saved: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

function daysUntil(d: string) {
  return Math.ceil((new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function Applications() {
  const [apps, setApps] = useState<App[]>(seed);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Status | "All">("All");
  const [sort, setSort] = useState<"deadline" | "priority" | "company">("deadline");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<App, "id" | "progress">>({
    company: "", position: "", deadline: "", status: "Applied", priority: "Medium",
  });

  const filtered = useMemo(() => {
    let out = apps.filter((a) =>
      (filter === "All" || a.status === filter) &&
      (q === "" || `${a.company} ${a.position}`.toLowerCase().includes(q.toLowerCase()))
    );
    const prio: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };
    out = [...out].sort((a, b) => {
      if (sort === "deadline") return a.deadline.localeCompare(b.deadline);
      if (sort === "priority") return prio[a.priority] - prio[b.priority];
      return a.company.localeCompare(b.company);
    });
    return out;
  }, [apps, q, filter, sort]);

  const add = () => {
    if (!draft.company || !draft.position) { toast.error("Company and position required"); return; }
    setApps((prev) => [{ ...draft, id: crypto.randomUUID(), progress: 20 }, ...prev]);
    setDraft({ company: "", position: "", deadline: "", status: "Applied", priority: "Medium" });
    setOpen(false);
    toast.success("Application added");
  };

  const remove = (id: string) => {
    setApps((prev) => prev.filter((a) => a.id !== id));
    toast.success("Deleted");
  };

  const nextInterview = apps.find((a) => a.status === "Interview");

  return (
    <AppShell
      title="Applications tracker"
      subtitle="Search, filter and sort every application in one workspace."
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <Plus className="mr-1.5 h-4 w-4" /> Add application
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New application</DialogTitle></DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-1.5"><Label>Company</Label><Input value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} /></div>
              <div className="grid gap-1.5"><Label>Position</Label><Input value={draft.position} onChange={(e) => setDraft({ ...draft, position: e.target.value })} /></div>
              <div className="grid gap-1.5"><Label>Deadline</Label><Input type="date" value={draft.deadline} onChange={(e) => setDraft({ ...draft, deadline: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5"><Label>Status</Label>
                  <Select value={draft.status} onValueChange={(v) => setDraft({ ...draft, status: v as Status })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(["Saved","Applied","Assessment","Interview","Offer","Rejected"] as Status[]).map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5"><Label>Priority</Label>
                  <Select value={draft.priority} onValueChange={(v) => setDraft({ ...draft, priority: v as Priority })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(["High","Medium","Low"] as Priority[]).map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter><Button onClick={add}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {nextInterview && (
        <Card className="mb-6 overflow-hidden border-primary/30">
          <div className="h-1 w-full" style={{ background: "var(--gradient-primary)" }} />
          <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Clock className="h-5 w-5" /></div>
              <div>
                <div className="text-sm text-muted-foreground">Next interview</div>
                <div className="font-semibold">{nextInterview.company} — {nextInterview.position}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{Math.max(0, daysUntil(nextInterview.deadline))}d</div>
              <div className="text-xs text-muted-foreground">until interview</div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search company or position…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Select value={filter} onValueChange={(v) => setFilter(v as Status | "All")}>
              <SelectTrigger className="sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                {(["All","Saved","Applied","Assessment","Interview","Offer","Rejected"] as const).map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
              <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Sort: Deadline</SelectItem>
                <SelectItem value="priority">Sort: Priority</SelectItem>
                <SelectItem value="company">Sort: Company</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.company}</TableCell>
                    <TableCell className="text-muted-foreground">{a.position}</TableCell>
                    <TableCell className="text-muted-foreground">{a.deadline || "—"}</TableCell>
                    <TableCell><Badge variant="outline" className={statusStyles[a.status]}>{a.status}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={a.priority === "High" ? "destructive" : a.priority === "Medium" ? "default" : "secondary"}>
                        {a.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <Progress value={a.progress} className="h-1.5" />
                        <span className="text-xs text-muted-foreground">{a.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => remove(a.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">No applications match your filters.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}