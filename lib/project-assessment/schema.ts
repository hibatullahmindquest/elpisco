import { z } from "zod";

// Individual field validators, kept as a standalone record (rather than only
// inline inside the object schema) so step-by-step validation can look up
// and run just the validator for the field(s) on the current step.
const fieldSchemas = {
  propertyType: z.string().min(1, "Select a property type."),
  projectLocation: z.string().min(2, "Add a location.").max(120),
  builtUpRange: z.string().min(1, "Select an approximate built-up."),
  services: z.array(z.string()).min(1, "Select at least one service."),
  areas: z.array(z.string()).min(1, "Select at least one area."),
  transformationLevel: z.string().min(1, "Select how significant the change is."),
  budgetRange: z.string().min(1, "Select an investment range."),
  startTiming: z.string().min(1, "Select when you'd like to begin."),
  projectDetails: z.string().min(30, "A few more details help us review the project.").max(2000),
  name: z.string().min(2, "Add your name.").max(120),
  phone: z.string().min(7, "Add a contact number.").max(30),
  email: z.email("Add a valid email."),
  consent: z.literal(true, { error: "Consent is required to submit this enquiry." }),
};

export const projectEnquirySchema = z.object({
  ...fieldSchemas,
  preferredContactMethod: z.string().optional(),
  // Honeypot — must stay empty. Real visitors never see or fill this field.
  company: z.string().max(0).optional().default(""),
});

export type ProjectEnquiry = z.infer<typeof projectEnquirySchema>;

type ValidatedFieldKey = keyof typeof fieldSchemas;

/** Validates a single field's value, returning an error message or null. */
export function validateField(key: ValidatedFieldKey, value: unknown): string | null {
  const result = fieldSchemas[key].safeParse(value);
  return result.success ? null : (result.error.issues[0]?.message ?? "This field is required.");
}

// Per-step field groupings, used to validate only the fields relevant to the
// step the visitor is currently on (rather than the whole schema at once).
export const STEP_FIELDS = {
  propertyType: ["propertyType"],
  projectLocation: ["projectLocation"],
  builtUpRange: ["builtUpRange"],
  services: ["services"],
  areas: ["areas"],
  transformationLevel: ["transformationLevel"],
  budgetRange: ["budgetRange"],
  startTiming: ["startTiming"],
  projectDetails: ["projectDetails"],
  contact: ["name", "phone", "email", "consent"],
} as const satisfies Record<string, ValidatedFieldKey[]>;
