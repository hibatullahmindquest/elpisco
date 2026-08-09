// Adapter-based so GA4 / Meta Pixel destinations can be added later purely
// through GTM trigger configuration, without touching wizard components.
// Pushes to the same `dataLayer` the site's GTM snippet already reads from
// (see components/analytics/Tracking.tsx) — a no-op until GTM is configured.
//
// Never pass project description, name, email or phone here — see
// ELPIS_PROJECT_ASSESSMENT_SPEC.md section 15.

export type AssessmentEvent =
  | "assessment_start"
  | "assessment_step_view"
  | "assessment_step_complete"
  | "assessment_back"
  | "assessment_budget_selected"
  | "assessment_form_submit"
  | "assessment_submit_success"
  | "assessment_submit_error"
  | "whatsapp_click";

export type AssessmentEventProps = {
  step?: number;
  property_type?: string;
  built_up_range?: string;
  transformation_level?: string;
  budget_range?: string;
  start_timing?: string;
  selected_services_count?: number;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackAssessmentEvent(event: AssessmentEvent, props: AssessmentEventProps = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...props });
}
