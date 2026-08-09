"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryFormState } from "@/app/(frontend)/contact/actions";

const initialState: EnquiryFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div role="status">
        <p className="h-medium" style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--ink)" }}>
          Thank you. Your project has been received.
        </p>
        <p className="body-copy" style={{ marginTop: 16, maxWidth: 460 }}>
          Our team will review the information and contact you regarding the appropriate next
          step.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} style={{ display: "grid", gap: 28 }}>
      <div className="grid-12" style={{ rowGap: 28 }}>
        {/* Honeypot — hidden from real visitors via CSS, not display:none so
            screen readers that ignore CSS still see aria-hidden. Bots that
            fill every field trip the collection's server-side check. */}
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="field col-line-1-6">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field col-line-7-end">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>

        <div className="field col-line-1-6">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field col-line-7-end">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" type="text" placeholder="e.g. Shah Alam" />
        </div>

        <div className="field col-line-1-4">
          <label htmlFor="projectType">Project Type</label>
          <select id="projectType" name="projectType" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="Interior Design">Interior Design</option>
            <option value="Renovation">Renovation</option>
            <option value="Design & Build">Design &amp; Build</option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
        </div>
        <div className="field col-line-5-end">
          <label htmlFor="propertyType">Property Type</label>
          <input id="propertyType" name="propertyType" type="text" placeholder="e.g. Landed, condo" />
        </div>

        <div className="field col-line-1-6">
          <label htmlFor="budget">Estimated Investment</label>
          <input id="budget" name="budget" type="text" placeholder="e.g. RM300,000 to RM500,000" />
        </div>
        <div className="field col-line-7-end">
          <label htmlFor="timing">Desired Start</label>
          <input id="timing" name="timing" type="text" placeholder="e.g. Within 3 months" />
        </div>

        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="details">Tell us about your project</label>
          <textarea id="details" name="details" placeholder="Tell us about your property and what you have in mind." />
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="body-copy" style={{ color: "#a33" }}>
          {state.message}
        </p>
      )}

      <button type="submit" className="cta cta-solid" style={{ justifySelf: "flex-start" }} disabled={pending}>
        <span className="cta-label">{pending ? "SUBMITTING…" : "REQUEST A CONSULTATION"}</span>
        <span className="cta-arrow" aria-hidden="true">
          &#8599;
        </span>
      </button>
    </form>
  );
}
