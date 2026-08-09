import type { Metadata } from "next";
import Image from "next/image";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getPageMetadata } from "@/lib/seo";
import { getCredentials } from "@/lib/credentials";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/about", {
    title: "About Elpis",
    description:
      "Elpis is an interior design, renovation and design-and-build studio based in Shah Alam, Malaysia, connecting design thinking with disciplined execution.",
  });
}

const CORE_VALUES = [
  { n: "01", title: "INTENTION", body: "Every design decision should have a reason." },
  { n: "02", title: "CLARITY", body: "Clients deserve clear scope, communication and expectations." },
  { n: "03", title: "CRAFT", body: "Details matter because they determine how the whole space feels." },
  { n: "04", title: "ACCOUNTABILITY", body: "We take ownership of the decisions and responsibilities entrusted to us." },
  {
    n: "05",
    title: "RESPECT",
    body: "For the client, the property, the budget, the people building it and the time required to do the work properly.",
  },
];

const BACKGROUND_DATA = [
  { label: "ESTABLISHED", value: "[YEAR]" },
  { label: "BASED", value: "SHAH ALAM, SELANGOR" },
  { label: "PROJECTS COMPLETED", value: "[NUMBER]+" },
  { label: "SERVICE AREA", value: "[KLANG VALLEY / MALAYSIA]" },
  { label: "CORE TEAM", value: "[NUMBER]" },
];

const FOUNDERS = [
  { n: "01", name: "[FOUNDER NAME]", title: "CO-FOUNDER / [TITLE]" },
  { n: "02", name: "[FOUNDER NAME]", title: "CO-FOUNDER / [TITLE]" },
];

export default async function AboutPage() {
  const credentials = await getCredentials();

  return (
    <>
      <section
        data-nav-theme="light"
        style={{
          background: "var(--warm-white)",
          paddingTop: "calc(var(--header-h) + clamp(48px, 10vw, 96px))",
          paddingBottom: "clamp(48px, 8vw, 88px)",
        }}
      >
        <div className="container grid-12">
          <div className="col-line-label">
            <SectionLabel>About Elpis</SectionLabel>
          </div>
          <div className="col-line-4-end">
            <RevealText
              as="h1"
              className="h-hero"
              lines={["A STUDIO FOR", "CONSIDERED", "LIVING."]}
              style={{ color: "var(--ink)" }}
            />
            <p className="body-copy" style={{ marginTop: 28, maxWidth: 460 }}>
              Elpis is an interior design, renovation and design-and-build studio based in Shah
              Alam, Malaysia. We create homes through a process that connects design thinking with
              disciplined execution.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)" }}>
        <ParallaxImage
          src="/images/studio/studio-atmosphere.jpg"
          alt="Studio atmosphere: a timber-panelled corridor with warm cove lighting"
          aspect="21 / 9"
          sizes="100vw"
        />
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container grid-12" style={{ rowGap: 56 }}>
          <div className="col-line-1-5">
            <h2 className="h-medium" style={{ color: "var(--ink)" }}>
              Design is only as strong as its execution.
            </h2>
          </div>
          <div className="col-line-7-end">
            <p className="body-copy" style={{ maxWidth: 460 }}>
              We started Elpis with a simple belief: homeowners should not have to choose between a
              beautiful concept and a build that works in reality. Our role is to connect both.
            </p>
            <p className="body-copy" style={{ marginTop: 20, maxWidth: 460 }}>
              From the earliest conversations about how a family lives, through spatial planning,
              materials, technical coordination, site execution and final detailing, we approach
              the project as one complete piece of work. This gives our clients a clearer journey
              and gives the finished home greater consistency from room to room, detail to detail.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container grid-12" style={{ rowGap: 48 }}>
          <div className="col-line-1-5">
            <SectionLabel>The Studio</SectionLabel>
            <h2 className="h-medium" style={{ color: "var(--ink)", marginTop: 14 }}>
              Based in Malaysia. Built around the work.
            </h2>
          </div>
          <div className="col-line-7-end">
            <p className="body-copy" style={{ maxWidth: 460 }}>
              Elpis serves homeowners and property owners seeking a more considered approach to
              renovation. Our work spans interior design, renovation, design and build, custom
              cabinetry and project management, with selected projects undertaken based on scope,
              location and fit.
            </p>
            <p className="body-copy" style={{ marginTop: 20, maxWidth: 460 }}>
              Rather than maximising project volume, our focus is on maintaining the attention
              required to make decisions well and execute them properly.
            </p>
          </div>
          <div className="col-line-1-6" style={{ marginTop: 8 }}>
            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "28px 24px",
                margin: 0,
              }}
            >
              {BACKGROUND_DATA.map((item) => (
                <div key={item.label} style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                  <dt className="label" style={{ color: "var(--champagne-ink)" }}>
                    {item.label}
                  </dt>
                  <dd className="body-copy" style={{ margin: 0, marginTop: 8, color: "var(--ink)", fontSize: 16 }}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="body-copy" style={{ marginTop: 20, fontSize: 13, fontStyle: "italic" }}>
              Figures above are placeholders pending verified data from Elpis.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container">
          <SectionLabel>Founders</SectionLabel>
          <RevealText as="h2" className="h-section" lines={["THE PEOPLE", "BEHIND ELPIS."]} style={{ color: "var(--ink)", marginTop: 14 }} />

          <div className="grid-12" style={{ marginTop: 56, rowGap: 48 }}>
            {FOUNDERS.map((founder) => (
              <div key={founder.n} className="col-line-1-6">
                <div
                  style={{
                    aspectRatio: "3 / 4",
                    background: "var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <span className="label" style={{ color: "var(--muted)" }}>
                    PORTRAIT PENDING
                  </span>
                </div>
                <p className="h-medium" style={{ fontSize: "clamp(24px, 2.4vw, 32px)", color: "var(--ink)", marginTop: 20 }}>
                  {founder.name}
                </p>
                <p className="label" style={{ color: "var(--champagne-ink)", marginTop: 6 }}>
                  {founder.title}
                </p>
                <p className="body-copy" style={{ marginTop: 14, maxWidth: 380 }}>
                  Founder biography pending — to be provided by Elpis. Professional background,
                  years of experience, specialisation and design philosophy will appear here once
                  confirmed.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="dark"
        style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)" }}
      >
        <div className="container grid-12" style={{ rowGap: 64 }}>
          <div className="col-line-1-5">
            <SectionLabel theme="dark">Vision</SectionLabel>
            <h2 className="h-medium" style={{ color: "var(--soft-white)", marginTop: 14 }}>
              To create homes that remain relevant.
            </h2>
            <p className="body-copy" style={{ marginTop: 20, maxWidth: 380, color: "rgba(244,241,234,0.65)" }}>
              To be recognised as a trusted Malaysian design-and-build studio known for thoughtful
              residential spaces, disciplined project delivery and enduring quality.
            </p>
          </div>
          <div className="col-line-7-end">
            <SectionLabel theme="dark">Mission</SectionLabel>
            <h2 className="h-medium" style={{ color: "var(--soft-white)", marginTop: 14 }}>
              From intention to execution.
            </h2>
            <p className="body-copy" style={{ marginTop: 20, maxWidth: 380, color: "rgba(244,241,234,0.65)" }}>
              To guide every project through a clear, integrated process that combines meaningful
              design, practical planning, responsible construction and detail-focused delivery.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container">
          <SectionLabel>Core Values</SectionLabel>
          <div className="grid-12" style={{ marginTop: 32 }}>
            <div className="col-line-1-6">
              {CORE_VALUES.slice(0, 3).map((value) => (
                <div key={value.n} style={{ borderTop: "1px solid var(--line)", padding: "24px 0" }}>
                  <div style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
                    <span className="label" style={{ color: "var(--champagne-ink)", minWidth: 28 }}>
                      {value.n}
                    </span>
                    <div>
                      <p className="h-medium" style={{ fontSize: "clamp(20px, 2vw, 26px)", color: "var(--ink)" }}>
                        {value.title}
                      </p>
                      <p className="body-copy" style={{ marginTop: 8, maxWidth: 340 }}>
                        {value.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-line-7-end">
              {CORE_VALUES.slice(3).map((value) => (
                <div key={value.n} style={{ borderTop: "1px solid var(--line)", padding: "24px 0" }}>
                  <div style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
                    <span className="label" style={{ color: "var(--champagne-ink)", minWidth: 28 }}>
                      {value.n}
                    </span>
                    <div>
                      <p className="h-medium" style={{ fontSize: "clamp(20px, 2vw, 26px)", color: "var(--ink)" }}>
                        {value.title}
                      </p>
                      <p className="body-copy" style={{ marginTop: 8, maxWidth: 340 }}>
                        {value.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--line)" }} />
            </div>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container grid-12" style={{ rowGap: 40 }}>
          <div className="col-line-1-5">
            <h2 className="h-medium" style={{ color: "var(--ink)" }}>
              Quiet spaces. Strong decisions.
            </h2>
          </div>
          <div className="col-line-7-end">
            <p className="body-copy" style={{ maxWidth: 460 }}>
              Elpis is drawn to interiors that feel calm without becoming sterile, refined without
              becoming excessive and contemporary without depending on short-lived trends.
            </p>
            <p className="body-copy" style={{ marginTop: 20, maxWidth: 460 }}>
              Our aesthetic changes with each client and property. What remains consistent is the
              way we work: proportion before decoration, material with purpose, lighting with
              restraint and details that belong to the architecture.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--warm-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container grid-12" style={{ rowGap: 40 }}>
          <div className="col-line-1-5">
            <h2 className="h-medium" style={{ color: "var(--ink)" }}>
              What clients can expect.
            </h2>
          </div>
          <div className="col-line-7-end">
            <p className="body-copy" style={{ maxWidth: 460 }}>
              A renovation requires trust long before the finished space exists. Our commitment is
              to protect that trust with clear communication, documented decisions, realistic
              expectations, responsible coordination and attention to workmanship throughout the
              project.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" style={{ background: "var(--soft-white)", paddingBlock: "clamp(64px, 10vw, 120px)" }}>
        <div className="container">
          <SectionLabel>Certificates &amp; Credentials</SectionLabel>
          <RevealText
            as="h2"
            className="h-section"
            lines={["BUILT ON PROFESSIONAL", "FOUNDATIONS."]}
            style={{ color: "var(--ink)", marginTop: 14 }}
          />

          {credentials.length > 0 ? (
            <div
              style={{
                marginTop: 48,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 24,
              }}
            >
              {credentials.map((credential) => (
                <div
                  key={credential.label}
                  style={{
                    borderTop: "1px solid var(--line)",
                    paddingTop: 18,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  {credential.iconUrl && (
                    <Image
                      src={credential.iconUrl}
                      alt=""
                      width={40}
                      height={40}
                      style={{ objectFit: "contain", flexShrink: 0 }}
                    />
                  )}
                  <div>
                    <p className="body-copy" style={{ color: "var(--ink)", fontSize: 15, fontWeight: 600 }}>
                      {credential.label}
                    </p>
                    {credential.value && (
                      <p className="body-copy" style={{ marginTop: 4, fontSize: 14 }}>
                        {credential.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="body-copy" style={{ marginTop: 32, maxWidth: 420 }}>
              Verified registrations and certifications will appear here once confirmed. We do not
              publish credentials that have not been verified.
            </p>
          )}
        </div>
      </section>

      <section
        data-nav-theme="dark"
        style={{ background: "var(--navy)", paddingBlock: "clamp(80px, 12vw, 140px)", textAlign: "center" }}
      >
        <div className="container">
          <RevealText
            as="h2"
            className="h-section"
            lines={["LET'S TALK", "ABOUT YOUR SPACE."]}
            style={{ color: "var(--soft-white)", textAlign: "center" }}
          />
          <div style={{ marginTop: 40 }}>
            <AnimatedLink href="/start-a-project" variant="solid-invert">
              START A PROJECT
            </AnimatedLink>
          </div>
        </div>
      </section>
    </>
  );
}
