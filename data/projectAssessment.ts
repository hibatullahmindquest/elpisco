export type AssessmentOption = {
  label: string;
  value: string;
  description?: string;
};

type BaseStep = {
  id: string;
  index: number;
  label: string;
  question: string[];
  helper?: string;
};

export type SingleChoiceStep = BaseStep & { type: "single"; options: AssessmentOption[] };
export type MultiChoiceStep = BaseStep & {
  type: "multi";
  options: AssessmentOption[];
  /** Selecting this value clears every other selection (e.g. "Not sure yet"). */
  exclusiveValue?: string;
};
export type TextStep = BaseStep & { type: "text"; placeholder: string };
export type TextareaStep = BaseStep & { type: "textarea"; placeholder: string };
export type ContactStepConfig = BaseStep & { type: "contact" };

export type AssessmentStep = SingleChoiceStep | MultiChoiceStep | TextStep | TextareaStep | ContactStepConfig;

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    id: "propertyType",
    index: 1,
    label: "01 / PROJECT",
    question: ["WHAT TYPE OF", "PROPERTY IS THIS?"],
    helper: "This helps us understand the likely planning and execution requirements.",
    type: "single",
    options: [
      { label: "Landed Home", value: "Landed Home" },
      { label: "Condominium", value: "Condominium" },
      { label: "Apartment", value: "Apartment" },
      { label: "Commercial / Building", value: "Commercial / Building" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    id: "projectLocation",
    index: 2,
    label: "02 / LOCATION",
    question: ["WHERE IS THE", "PROPERTY LOCATED?"],
    type: "text",
    placeholder: "e.g. Shah Alam, Petaling Jaya, Mont Kiara",
  },
  {
    id: "builtUpRange",
    index: 3,
    label: "03 / SCALE",
    question: ["WHAT IS THE", "APPROXIMATE BUILT-UP?"],
    type: "single",
    options: [
      { label: "Below 1,500 sq ft", value: "Below 1,500 sq ft" },
      { label: "1,500–2,500 sq ft", value: "1,500–2,500 sq ft" },
      { label: "2,500–4,000 sq ft", value: "2,500–4,000 sq ft" },
      { label: "4,000–6,000 sq ft", value: "4,000–6,000 sq ft" },
      { label: "6,000+ sq ft", value: "6,000+ sq ft" },
      { label: "Not sure", value: "Not sure" },
    ],
  },
  {
    id: "services",
    index: 4,
    label: "04 / SCOPE",
    question: ["WHAT WOULD YOU", "LIKE ELPIS TO HANDLE?"],
    helper: "Select all that apply.",
    type: "multi",
    exclusiveValue: "Not sure yet",
    options: [
      { label: "Interior Design", value: "Interior Design" },
      { label: "Renovation", value: "Renovation" },
      { label: "Design & Build", value: "Design & Build" },
      { label: "Custom Cabinetry", value: "Custom Cabinetry" },
      { label: "Project Management", value: "Project Management" },
      { label: "Not sure yet", value: "Not sure yet" },
    ],
  },
  {
    id: "areas",
    index: 5,
    label: "05 / AREAS",
    question: ["WHICH AREAS", "ARE INVOLVED?"],
    type: "multi",
    options: [
      { label: "Whole Property", value: "Whole Property" },
      { label: "Living / Dining", value: "Living / Dining" },
      { label: "Kitchen", value: "Kitchen" },
      { label: "Bedrooms", value: "Bedrooms" },
      { label: "Bathrooms", value: "Bathrooms" },
      { label: "Exterior", value: "Exterior" },
      { label: "Extension / Structural Work", value: "Extension / Structural Work" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    id: "transformationLevel",
    index: 6,
    label: "06 / INTENT",
    question: ["HOW SIGNIFICANT", "IS THE CHANGE?"],
    type: "single",
    options: [
      { label: "Refresh", value: "refresh", description: "Cosmetic upgrades with limited structural or layout changes." },
      {
        label: "Major Renovation",
        value: "major",
        description: "Significant interior works, new finishes, cabinetry, services and selected layout changes.",
      },
      {
        label: "Full Transformation",
        value: "full",
        description: "Comprehensive redesign and renovation across most or all of the property.",
      },
      { label: "Not Sure Yet", value: "unsure", description: "We can help define the appropriate scope." },
    ],
  },
  {
    id: "budgetRange",
    index: 7,
    label: "07 / INVESTMENT",
    question: ["WHAT INVESTMENT", "RANGE ARE YOU", "PLANNING FOR?"],
    helper: "A realistic investment range helps us recommend an appropriate scope.",
    type: "single",
    options: [
      { label: "RM150K–RM300K", value: "RM150K–RM300K" },
      { label: "RM300K–RM500K", value: "RM300K–RM500K" },
      { label: "RM500K–RM800K", value: "RM500K–RM800K" },
      { label: "RM800K–RM1M", value: "RM800K–RM1M" },
      { label: "RM1M+", value: "RM1M+" },
      { label: "Prefer to discuss", value: "Prefer to discuss" },
    ],
  },
  {
    id: "startTiming",
    index: 8,
    label: "08 / TIMING",
    question: ["WHEN WOULD YOU", "LIKE TO BEGIN?"],
    type: "single",
    options: [
      { label: "Ready to begin", value: "Ready to begin" },
      { label: "Within 1–3 months", value: "Within 1–3 months" },
      { label: "Within 3–6 months", value: "Within 3–6 months" },
      { label: "Within 6–12 months", value: "Within 6–12 months" },
      { label: "More than 12 months", value: "More than 12 months" },
      { label: "Still planning", value: "Still planning" },
    ],
  },
  {
    id: "projectDetails",
    index: 9,
    label: "09 / BRIEF",
    question: ["TELL US ABOUT", "THE PROJECT."],
    helper: "What would you like to change, solve or create?",
    type: "textarea",
    placeholder:
      "Tell us about the property, your priorities, current challenges and the kind of result you are looking for.",
  },
  {
    id: "contact",
    index: 10,
    label: "10 / YOU",
    question: ["HOW SHOULD WE", "REACH YOU?"],
    type: "contact",
  },
];
