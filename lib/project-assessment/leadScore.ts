import type { ProjectEnquiry } from "@/lib/project-assessment/schema";

export type LeadScore = {
  total: number;
  tier: "priority" | "qualified" | "review" | "low-fit";
};

const BUDGET_POINTS: Record<string, number> = {
  "RM1M+": 5,
  "RM800K–RM1M": 5,
  "RM500K–RM800K": 4,
  "RM300K–RM500K": 3,
  "RM150K–RM300K": 1,
  "Prefer to discuss": 1,
};

const TIMING_POINTS: Record<string, number> = {
  "Ready to begin": 2,
  "Within 1–3 months": 2,
  "Within 3–6 months": 1,
};

// Internal-only signal for CRM sorting and follow-up prioritisation — never
// surfaced to the visitor, and never used to auto-reject an enquiry.
export function scoreLead(data: Pick<ProjectEnquiry, "budgetRange" | "services" | "areas" | "transformationLevel" | "startTiming">): LeadScore {
  let total = 0;

  total += BUDGET_POINTS[data.budgetRange] ?? 0;

  if (data.services.includes("Design & Build")) total += 3;
  if (data.areas.includes("Whole Property")) total += 2;
  if (data.transformationLevel === "full") total += 3;
  if (data.transformationLevel === "major") total += 2;

  total += TIMING_POINTS[data.startTiming] ?? 0;

  let tier: LeadScore["tier"] = "low-fit";
  if (total >= 9) tier = "priority";
  else if (total >= 6) tier = "qualified";
  else if (total >= 3) tier = "review";

  return { total, tier };
}
