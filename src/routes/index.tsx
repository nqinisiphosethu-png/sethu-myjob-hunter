import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  CalendarClock,
  Briefcase,
  Search,
  Mail,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyJob Hunter — Your calm, AI-powered job search workspace" },
      {
        name: "description",
        content:
          "Plan applications, research companies, and prep for interviews in one calm workspace. MyJob Hunter turns the chaos of job hunting into a clear daily plan.",
      },
      { property: "og:title", content: "MyJob Hunter — Your calm, AI-powered job search workspace" },
      {
        property: "og:description",
        content: "Plan applications, research companies, and prep for interviews in one calm workspace. MyJob Hunter turns the chaos of job hunting into a clear daily plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: CalendarClock,
    title: "AI Planner",
    desc: "Turn your goals into a realistic daily and weekly schedule.",
  },
  {
    icon: Briefcase,
    title: "Applications Tracker",
    desc: "See every application, deadline and next step in one place.",
  },
  {
    icon: Search,
    title: "Research Assistant",
    desc: "Instant company briefs, culture notes and tailored interview tips.",
  },
  {
    icon: Mail,
    title: "Smart Emails",
    desc: "Draft cover letters and follow-ups in your own tone in seconds.",
  },
  {
    icon: MessageSquare,
    title: "Career Coach",
    desc: "A patient AI mentor for CV feedback and mock interviews.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    desc: "Your data stays yours. Review every AI output before it goes out.",
  },
];

const steps = [
  { n: "01", t: "Tell us your goal", d: "Share your target roles, timeline and priorities." },
  { n: "02", t: "Get a clear plan", d: "Your AI planner breaks it into small, focused tasks." },
  { n: "03", t: "Apply with confidence", d: "Track progress, prep for interviews, land the role." },
];

function Landing() {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl shadow-[var(--shadow-elegant)]"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-tight sm:text-base">MyJob Hunter</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#responsible" className="hover:text-foreground">Responsible AI</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/app">Sign in</Link>
            </Button>
            <Button
              asChild
              className="text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Link to="/app">
                Open app <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-60"
          style={{ background: "var(--gradient-subtle)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-[720px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
          <Badge variant="secondary" className="mb-5 inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> AI career assistant
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Job hunting, without the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              overwhelm
            </span>
            .
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            One calm workspace to plan applications, research companies, and prep for
            interviews — with an AI copilot that always knows the next best step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Link to="/app">
                Get started free <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how">See how it works</a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--success)]" /> No credit card</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--success)]" /> Your data, your control</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--success)]" /> Built for graduates</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t bg-muted/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need. Nothing you don't.</h2>
            <p className="mt-3 text-muted-foreground">
              Six focused tools, one clean workspace. Open only what you need, when you need it.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]"
              >
                <div
                  className="mb-4 grid h-11 w-11 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A calm rhythm in three steps</h2>
            <p className="mt-3 text-muted-foreground">You'll always know what to do next.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border bg-card p-6">
                <div
                  className="text-sm font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible AI */}
      <section id="responsible" className="border-t bg-muted/20 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div
            className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">AI that supports you, not replaces you</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Every suggestion is a draft — you stay in charge. Review, edit, and approve
            before anything is sent. Your history is private and easy to clear anytime.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-3xl border p-10 text-center shadow-[var(--shadow-elegant)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to feel in control of your job hunt?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
              Open your workspace and let's plan your first calm, focused day.
            </p>
            <div className="mt-7">
              <Button asChild size="lg" variant="secondary">
                <Link to="/app">
                  Open MyJob Hunter <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <div className="font-semibold text-foreground">MyJob Hunter</div>
          <div>© {new Date().getFullYear()} MyJob Hunter · AI-generated content should always be reviewed.</div>
        </div>
      </footer>
    </div>
  );
}