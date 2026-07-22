import { type ReactNode } from "react";
import { Bell, Moon, Sun, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";
import { Link } from "@tanstack/react-router";

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { theme, toggle } = useTheme();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur sm:px-6">
            <SidebarTrigger />
            <div className="ml-1 hidden max-w-md flex-1 items-center gap-2 rounded-lg border bg-muted/40 px-3 py-1.5 md:flex">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications, companies, notes…"
                className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              />
              <kbd className="hidden rounded border bg-background px-1.5 text-[10px] text-muted-foreground lg:inline">⌘K</kbd>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
              <div className="ml-1 flex items-center gap-2 rounded-full border bg-card px-1 py-1 pr-3">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">JD</AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <div className="text-xs font-semibold leading-tight">Jamie Doe</div>
                  <div className="text-[10px] leading-tight text-muted-foreground">Graduate</div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-3 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      AI
                    </Badge>
                  </div>
                  {subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                  )}
                </div>
                {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
              </div>
              {children}
            </div>
          </main>

          <footer className="mt-6 border-t bg-muted/30 px-4 py-6 text-xs text-muted-foreground sm:px-8">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-semibold text-foreground">MyJob Hunter</span>
                <Link to="/settings" className="hover:text-foreground">Privacy Policy</Link>
                <Link to="/settings" className="hover:text-foreground">Terms of Service</Link>
                <Link to="/settings" className="hover:text-foreground">Responsible AI</Link>
                <Link to="/settings" className="hover:text-foreground">Contact</Link>
              </div>
              <div>v1.0.0 · AI-generated content should always be reviewed.</div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
