"use server";

import { getPayloadClient } from "@/lib/payload";
import type { Enquiry } from "@/payload-types";

const PROJECT_TYPES: Enquiry["projectType"][] = ["Interior Design", "Renovation", "Design & Build", "Not Sure Yet"];

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !email) {
    return { status: "error", message: "Please provide your name and email." };
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "enquiries",
      data: {
        name,
        email,
        phone: String(formData.get("phone") ?? ""),
        location: String(formData.get("location") ?? ""),
        projectType: PROJECT_TYPES.find((t) => t === formData.get("projectType")),
        propertyType: String(formData.get("propertyType") ?? ""),
        budget: String(formData.get("budget") ?? ""),
        timing: String(formData.get("timing") ?? ""),
        details: String(formData.get("details") ?? ""),
        // Honeypot — real visitors never fill this. A non-empty value trips
        // the collection's beforeValidate hook and the create() call throws.
        company: String(formData.get("company") ?? ""),
      },
    });
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong submitting your enquiry. Please try again or reach out on WhatsApp.",
    };
  }
}
