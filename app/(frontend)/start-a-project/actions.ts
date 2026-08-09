"use server";

import { getPayloadClient } from "@/lib/payload";
import { projectEnquirySchema } from "@/lib/project-assessment/schema";
import { scoreLead } from "@/lib/project-assessment/leadScore";

export type SubmitAssessmentResult = { status: "success" } | { status: "error"; message: string };

export async function submitProjectAssessment(data: unknown): Promise<SubmitAssessmentResult> {
  const parsed = projectEnquirySchema.safeParse(data);
  if (!parsed.success) {
    return { status: "error", message: "Some information is missing or invalid. Please review your answers." };
  }

  const answers = parsed.data;

  // Honeypot — a filled value here means a bot filled every field blindly.
  // Report success without writing anything, so the bot gets no signal.
  if (answers.company) {
    return { status: "success" };
  }

  const { total, tier } = scoreLead(answers);

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "enquiries",
      data: {
        source: "start-a-project",
        leadScore: total,
        leadTier: tier,
        name: answers.name,
        email: answers.email,
        phone: answers.phone,
        preferredContactMethod: answers.preferredContactMethod,
        location: answers.projectLocation,
        propertyType: answers.propertyType,
        builtUpRange: answers.builtUpRange,
        services: answers.services.map((value) => ({ value })),
        areas: answers.areas.map((value) => ({ value })),
        transformationLevel: answers.transformationLevel,
        budget: answers.budgetRange,
        timing: answers.startTiming,
        details: answers.projectDetails,
        consent: answers.consent,
      },
    });
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong submitting your project. Please try again or reach out on WhatsApp.",
    };
  }
}
