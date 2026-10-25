import { Forminit } from "forminit";

// Same Forminit form the live keelerk9services.ca site submits to, so form
// requests keep arriving in the same Forminit inbox after the switch-over.
export const FORMINIT_FORM_ID = "d39d85bsyma";

const forminit = new Forminit();

export function toE164(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return trimmed;
}

/** Send a form payload to the business through Forminit. Throws on failure. */
export async function submitToForminit(payload: FormData): Promise<void> {
  const { error } = await forminit.submit(FORMINIT_FORM_ID, payload);
  if (error) throw new Error(error.message || "Submission failed.");
}
