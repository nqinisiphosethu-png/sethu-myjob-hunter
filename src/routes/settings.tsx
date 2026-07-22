import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, User, Bell, Palette } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · MyJob Hunter" },
      { name: "description", content: "Manage profile, notifications and responsible AI preferences." },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <AppShell title="Settings" subtitle="Manage your profile, preferences and responsible-AI guardrails.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><User className="h-4 w-4 text-primary" /> Profile</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5"><Label>Full name</Label><Input defaultValue="Jamie Doe" /></div>
              <div className="grid gap-1.5"><Label>Email</Label><Input type="email" defaultValue="jamie@example.com" /></div>
              <div className="grid gap-1.5"><Label>Target role</Label><Input defaultValue="Graduate Software Developer" /></div>
              <div className="grid gap-1.5"><Label>Location</Label><Input defaultValue="London, UK" /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4 text-primary" /> Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <ToggleRow label="Deadline reminders" desc="Email me 24 hours before an application deadline." defaultChecked />
              <ToggleRow label="Interview alerts" desc="Push notifications for upcoming interviews." defaultChecked />
              <ToggleRow label="AI weekly summary" desc="A Sunday recap of your progress and next steps." />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Palette className="h-4 w-4 text-primary" /> Appearance</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <ToggleRow label="Reduce motion" desc="Minimise animations across the app." />
              <ToggleRow label="High-contrast mode" desc="Improve readability for accessibility." />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden border-primary/20">
            <div className="h-1 w-full" style={{ background: "var(--gradient-primary)" }} />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="h-4 w-4 text-primary" /> Responsible AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                AI-generated responses are intended to assist users with career planning, company
                research, interview preparation, and professional communication. Users should verify
                all information and review generated content before submitting job applications or
                communicating with recruiters. AI is designed to support human decision-making,
                not replace it.
              </p>
              <Separator />
              <ToggleRow label="Require review before sending" desc="Warn me before copying AI-generated emails." defaultChecked />
              <ToggleRow label="Store chat history locally" desc="Keep coach conversations on this device only." defaultChecked />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Button variant="outline" className="w-full">Export my data</Button>
              <Button variant="ghost" className="mt-2 w-full text-destructive hover:text-destructive">Delete account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function ToggleRow({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border bg-muted/30 p-3">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}