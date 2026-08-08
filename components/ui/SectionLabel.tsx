import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
};

export function SectionLabel({ children, theme = "light", className }: SectionLabelProps) {
  return (
    <p
      className={cn("label", className)}
      style={{ color: theme === "dark" ? "var(--champagne)" : "var(--champagne-ink)" }}
    >
      {children}
    </p>
  );
}
