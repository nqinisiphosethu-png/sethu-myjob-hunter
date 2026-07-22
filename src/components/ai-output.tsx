import { type ReactNode } from "react";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AiOutputCard({
  title = "AI response",
  copyText,
  onRegenerate,
  children,
}: {
  title?: string;
  copyText?: string;
  onRegenerate?: () => void;
  children: ReactNode;
}) {
  return (
    <Card className="overflow-hidden border-primary/20 shadow-[var(--shadow-elegant)]">
      <div className="h-1 w-full" style={{ background: "var(--gradient-primary)" }} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
        <div className="flex gap-1.5">
          {copyText && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(copyText);
                toast.success("Copied to clipboard");
              }}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
            </Button>
          )}
          {onRegenerate && (
            <Button size="sm" variant="ghost" onClick={onRegenerate}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Regenerate
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export function AiSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-primary">{title}</div>
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}
