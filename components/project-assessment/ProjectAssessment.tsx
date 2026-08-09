"use client";

import { useEffect, useRef, useState } from "react";
import { ASSESSMENT_STEPS } from "@/data/projectAssessment";
import { STEP_FIELDS, validateField, type ProjectEnquiry } from "@/lib/project-assessment/schema";
import { trackAssessmentEvent } from "@/lib/project-assessment/analytics";
import { submitProjectAssessment } from "@/app/(frontend)/start-a-project/actions";
import { AssessmentProgress } from "@/components/project-assessment/AssessmentProgress";
import { AssessmentSuccess } from "@/components/project-assessment/AssessmentSuccess";
import { SingleChoiceField } from "@/components/project-assessment/SingleChoiceField";
import { MultiChoiceField } from "@/components/project-assessment/MultiChoiceField";
import { TextField, TextareaField } from "@/components/project-assessment/TextField";
import { ContactStep, type ContactAnswers } from "@/components/project-assessment/ContactStep";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, registerGsap } from "@/lib/gsap";

// `consent` is `boolean` here (unchecked until the visitor checks it), not
// the zod schema's literal `true` — that literal only constrains the final
// validated submission, not the wizard's in-progress state.
type Answers = Omit<ProjectEnquiry, "consent"> & { consent: boolean };

const EMPTY_ANSWERS: Answers = {
  propertyType: "",
  projectLocation: "",
  builtUpRange: "",
  services: [],
  areas: [],
  transformationLevel: "",
  budgetRange: "",
  startTiming: "",
  projectDetails: "",
  name: "",
  phone: "",
  email: "",
  preferredContactMethod: "",
  consent: false,
  company: "",
};

const STORAGE_KEY = "elpis-assessment-progress";

type SavedProgress = { answers: Answers; stepIndex: number };

// Read once and reused by both lazy initializers below, rather than an
// effect that would set state after the first render (and cause a visible
// flash from empty -> hydrated state).
function readSavedProgress(): SavedProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedProgress) : null;
  } catch {
    return null;
  }
}

export function ProjectAssessment() {
  const [answers, setAnswers] = useState<Answers>(
    () => ({ ...EMPTY_ANSWERS, ...readSavedProgress()?.answers })
  );
  const [stepIndex, setStepIndex] = useState<number>(
    () => Math.min(readSavedProgress()?.stepIndex ?? 0, ASSESSMENT_STEPS.length - 1)
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const total = ASSESSMENT_STEPS.length;
  const step = ASSESSMENT_STEPS[stepIndex];

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      trackAssessmentEvent("assessment_start");
    }
    trackAssessmentEvent("assessment_step_view", { step: step.index });
  }, [step.index]);

  useEffect(() => {
    if (submitted) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, stepIndex }));
    } catch {
      // Storage full or unavailable — persistence is a convenience, not a
      // requirement, so fail silently.
    }
  }, [answers, stepIndex, submitted]);

  // Entrance animation for each step's content.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, [stepIndex]);

  function patch(fields: Partial<Answers>) {
    setAnswers((prev) => ({ ...prev, ...fields }));
    setError(null);
  }

  function transitionTo(nextIndex: number) {
    const el = contentRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!el || reduce) {
      setStepIndex(nextIndex);
      return;
    }

    gsap.to(el, {
      y: -16,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => setStepIndex(nextIndex),
    });
  }

  function validateCurrentStep(): boolean {
    const keys = STEP_FIELDS[step.id as keyof typeof STEP_FIELDS];
    if (!keys) return true;

    for (const key of keys) {
      const message = validateField(key, answers[key as keyof Answers]);
      if (message) {
        setError(message);
        return false;
      }
    }
    setError(null);
    return true;
  }

  async function handleContinue() {
    if (!validateCurrentStep()) return;

    trackAssessmentEvent("assessment_step_complete", { step: step.index });

    if (stepIndex < total - 1) {
      transitionTo(stepIndex + 1);
      return;
    }

    // Final step — submit.
    setSubmitting(true);
    trackAssessmentEvent("assessment_form_submit");
    const result = await submitProjectAssessment(answers);
    setSubmitting(false);

    if (result.status === "success") {
      trackAssessmentEvent("assessment_submit_success");
      setSubmitted(true);
    } else {
      trackAssessmentEvent("assessment_submit_error");
      setError(result.message);
    }
  }

  function handleBack() {
    if (stepIndex === 0) return;
    trackAssessmentEvent("assessment_back", { step: step.index });
    transitionTo(stepIndex - 1);
  }

  if (submitted) {
    return (
      <section
        data-nav-theme="dark"
        style={{
          background: "var(--navy)",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          paddingBlock: "clamp(64px, 10vw, 120px)",
        }}
      >
        <div className="container">
          <AssessmentSuccess />
        </div>
      </section>
    );
  }

  const isLastStep = stepIndex === total - 1;

  return (
    <section
      data-nav-theme="dark"
      style={{
        background: "var(--navy)",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBlock: "calc(var(--header-h) + clamp(32px, 6vw, 56px)) clamp(48px, 8vw, 88px)",
      }}
    >
      <div className="container" style={{ width: "100%" }}>
        <AssessmentProgress step={step.index} total={total} onBack={stepIndex > 0 ? handleBack : undefined} />

        <div ref={contentRef} style={{ marginTop: "clamp(40px, 7vw, 72px)", maxWidth: 640 }}>
          <SectionLabel theme="dark">{step.label}</SectionLabel>
          <div style={{ marginTop: 16 }}>
            <RevealText
              key={step.id}
              as="h1"
              className="h-section"
              immediate
              lines={step.question}
              style={{ color: "var(--soft-white)", fontSize: "clamp(32px, 5.5vw, 72px)" }}
            />
          </div>
          {step.type !== "contact" && step.helper && (
            <p className="body-copy" style={{ marginTop: 20, color: "rgba(244,241,234,0.6)" }}>
              {step.helper}
            </p>
          )}

          <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
            {step.type === "single" && (
              <SingleChoiceField
                name={step.id}
                groupLabel={step.question.join(" ")}
                options={step.options}
                value={answers[step.id as keyof Answers] as string}
                onChange={(value) => {
                  patch({ [step.id]: value } as Partial<Answers>);
                  if (step.id === "budgetRange") {
                    trackAssessmentEvent("assessment_budget_selected", { budget_range: value });
                  }
                }}
              />
            )}

            {step.type === "multi" && (
              <MultiChoiceField
                name={step.id}
                groupLabel={step.question.join(" ")}
                options={step.options}
                values={answers[step.id as keyof Answers] as string[]}
                exclusiveValue={step.exclusiveValue}
                onChange={(values) => patch({ [step.id]: values } as Partial<Answers>)}
              />
            )}

            {step.type === "text" && (
              <TextField
                id={step.id}
                value={answers[step.id as keyof Answers] as string}
                onChange={(value) => patch({ [step.id]: value } as Partial<Answers>)}
                placeholder={step.placeholder}
              />
            )}

            {step.type === "textarea" && (
              <TextareaField
                id={step.id}
                value={answers[step.id as keyof Answers] as string}
                onChange={(value) => patch({ [step.id]: value } as Partial<Answers>)}
                placeholder={step.placeholder}
              />
            )}

            {step.type === "contact" && (
              <ContactStep
                answers={{
                  name: answers.name,
                  phone: answers.phone,
                  email: answers.email,
                  preferredContactMethod: answers.preferredContactMethod ?? "",
                  consent: answers.consent,
                }}
                onChange={(fields: Partial<ContactAnswers>) => patch(fields as Partial<Answers>)}
              />
            )}
          </div>

          {/* Honeypot — real visitors never see or fill this. */}
          <input
            type="text"
            name="company"
            value={answers.company}
            onChange={(e) => patch({ company: e.target.value })}
            className="visually-hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {error && (
            <p role="alert" className="body-copy" style={{ marginTop: 20, color: "#e0a3a3" }}>
              {error}
            </p>
          )}

          <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
            <button
              type="button"
              onClick={handleContinue}
              disabled={submitting}
              className="cta cta-solid-invert"
            >
              <span className="cta-label">
                {submitting ? "SUBMITTING…" : isLastStep ? "SUBMIT PROJECT" : "CONTINUE"}
              </span>
              <span className="cta-arrow" aria-hidden="true">
                &#8599;
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
