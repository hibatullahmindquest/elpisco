"use client";

export function ContactForm() {
  return (
    <form
      // TODO: replace [EMAIL_ADDRESS] with the real business inbox and swap
      // this mailto: submission for a proper backend (API route + email
      // provider, or a form service) before launch.
      action="mailto:[EMAIL_ADDRESS]"
      method="post"
      encType="text/plain"
      style={{ display: "grid", gap: 28 }}
    >
      <div className="grid-12" style={{ rowGap: 28 }}>
        <div className="field col-line-1-6">
          <label htmlFor="name">Name</label>
          <input id="name" name="Name" type="text" required autoComplete="name" />
        </div>
        <div className="field col-line-7-end">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="Phone" type="tel" autoComplete="tel" />
        </div>

        <div className="field col-line-1-6">
          <label htmlFor="email">Email</label>
          <input id="email" name="Email" type="email" required autoComplete="email" />
        </div>
        <div className="field col-line-7-end">
          <label htmlFor="location">Location</label>
          <input id="location" name="Location" type="text" placeholder="e.g. Shah Alam" />
        </div>

        <div className="field col-line-1-4">
          <label htmlFor="projectType">Project Type</label>
          <select id="projectType" name="Project Type" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="Interior Design">Interior Design</option>
            <option value="Renovation">Renovation</option>
            <option value="Design & Build">Design &amp; Build</option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
        </div>
        <div className="field col-line-4-end">
          <label htmlFor="propertyType">Property Type</label>
          <input id="propertyType" name="Property Type" type="text" placeholder="e.g. Landed, condo" />
        </div>

        <div className="field col-line-1-6">
          <label htmlFor="budget">Estimated Budget</label>
          <input id="budget" name="Estimated Budget" type="text" placeholder="e.g. RM80,000 to RM150,000" />
        </div>
        <div className="field col-line-7-end">
          <label htmlFor="timing">Preferred Start Timing</label>
          <input id="timing" name="Preferred Start Timing" type="text" placeholder="e.g. Within 3 months" />
        </div>

        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="details">Project Details</label>
          <textarea id="details" name="Project Details" placeholder="Tell us about your space and what you have in mind." />
        </div>
      </div>

      <button type="submit" className="cta cta-solid" style={{ justifySelf: "flex-start" }}>
        <span className="cta-label">SUBMIT PROJECT ENQUIRY</span>
        <span className="cta-arrow" aria-hidden="true">
          &#8599;
        </span>
      </button>
    </form>
  );
}
