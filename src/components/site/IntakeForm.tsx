import { useState, type FormEvent } from "react";
import { submitToForminit, toE164 } from "@/lib/site/forminit";
import { newId, useSiteStore } from "@/lib/site/store";
import { useSnapshot } from "@/lib/site/useSite";
import type { Intake } from "@/lib/site/types";

async function fileToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const max = 1100;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not read that photo.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.72);
}

export function IntakeForm() {
  const { copy } = useSnapshot();
  const addIntake = useSiteStore((s) => s.addIntake);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const required = [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["phone", "Phone number"],
      ["dogName", "Dog's name"],
      ["reason", "Why the dog needs placement"],
      ["urgency", "Urgency"],
    ] as const;
    for (const [key, label] of required) {
      if (!String(data.get(key) || "").trim()) {
        setError(`Please add ${label.toLowerCase()}.`);
        return;
      }
    }
    setSending(true);
    const files = (data.getAll("photos") as File[]).filter((f) => f && f.size > 0).slice(0, 4);
    let photos: Intake["photos"] = [];
    try {
      photos = await Promise.all(
        files.map(async (file) => ({ id: newId(), dataUrl: await fileToDataUrl(file) })),
      );
    } catch {
      setSending(false);
      setError("One of the photos could not be read. Try a different picture.");
      return;
    }
    const item: Intake = {
      id: newId(),
      createdAt: new Date().toISOString(),
      kind: "placement",
      status: "new",
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      dogName: String(data.get("dogName") || "").trim(),
      dogAge: String(data.get("dogAge") || "").trim(),
      breed: String(data.get("breed") || "").trim(),
      reason: String(data.get("reason") || "").trim(),
      urgency: String(data.get("urgency") || "").trim(),
      medical: String(data.get("medical") || "").trim(),
      medications: String(data.get("medications") || "").trim(),
      diet: String(data.get("diet") || "").trim(),
      behaviour: String(data.get("behaviour") || "").trim(),
      notes: String(data.get("notes") || "").trim(),
      address: "",
      frequency: "",
      friendly: "",
      photos,
    };
    // Keep a copy in Owner tools on this device, as before.
    try {
      addIntake(item);
    } catch {
      // The Forminit send below is what reaches David; a failed local save
      // should not block it.
    }

    // Send the request to the business through Forminit, using the same form
    // (and field names) as the live site, so nothing is lost in the switch.
    const payload = new FormData();
    payload.append("fi-sender-firstName", item.firstName);
    payload.append("fi-sender-lastName", item.lastName);
    if (item.email) payload.append("fi-sender-email", item.email);
    payload.append("fi-sender-phone", toE164(item.phone));
    payload.append("fi-text-dogname", item.dogName);
    if (item.dogAge) payload.append("fi-text-dogage", item.dogAge);
    if (item.breed) payload.append("fi-text-breed", item.breed);
    payload.append("fi-text-reason", item.reason);
    payload.append("fi-select-urgency", item.urgency === "Coming up" ? "Coming Up" : item.urgency);
    if (item.medical) payload.append("fi-text-medical", item.medical);
    if (item.medications) payload.append("fi-text-medications", item.medications);
    if (item.diet) payload.append("fi-text-diet", item.diet);
    if (item.behaviour) payload.append("fi-text-behaviour", item.behaviour);
    if (item.notes) payload.append("fi-text-notes", item.notes);
    for (const file of files) payload.append("fi-file-dogphoto[]", file);

    try {
      await submitToForminit(payload);
      setDone(true);
    } catch {
      setError(
        "Your request could not be sent just now. It is saved on this device only — please call us so we can help right away.",
      );
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="form-success" role="status">
        <h3>Request sent</h3>
        <p>Thank you — your request has been sent to Keeler K9 Services and we will contact you shortly.</p>
        <p>
          If your dog needs help soon, call <a href={`tel:${copy.phoneTel}`}>{copy.phoneDisplay}</a> now.
        </p>
      </div>
    );
  }

  return (
    <form className="intake-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label>
          First name
          <input name="firstName" autoComplete="given-name" required />
        </label>
        <label>
          Last name
          <input name="lastName" autoComplete="family-name" required />
        </label>
      </div>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" placeholder="(437) 555-0100" required />
      </label>
      <label>
        Email <span className="optional">optional</span>
        <input name="email" type="email" autoComplete="email" />
      </label>
      <div className="form-row">
        <label>
          Dog's name
          <input name="dogName" required />
        </label>
        <label>
          Dog's age <span className="optional">optional</span>
          <input name="dogAge" placeholder="Example: 4 years" />
        </label>
      </div>
      <label>
        Breed or type <span className="optional">optional</span>
        <input name="breed" placeholder="Example: Lab mix" />
      </label>
      <label>
        Why does this dog need placement?
        <textarea name="reason" rows={4} required placeholder="Arrest, hospital, travel, or another reason." />
      </label>
      <label>
        Urgency
        <select name="urgency" required defaultValue="">
          <option value="" disabled>
            Select urgency
          </option>
          <option value="Immediate">Immediate</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="Coming up">Coming up</option>
        </select>
      </label>
      <label>
        Medical history <span className="optional">optional</span>
        <textarea name="medical" rows={3} placeholder="Injuries, illness, vet care, allergies." />
      </label>
      <label>
        Medications <span className="optional">optional</span>
        <textarea name="medications" rows={2} placeholder="Name, dose, and when they are given." />
      </label>
      <label>
        Special diet <span className="optional">optional</span>
        <textarea name="diet" rows={2} />
      </label>
      <label>
        Behaviour <span className="optional">optional</span>
        <textarea name="behaviour" rows={3} placeholder="Kids, other dogs, leash, fears, or anything we should know." />
      </label>
      <label>
        Anything else <span className="optional">optional</span>
        <textarea name="notes" rows={3} />
      </label>
      <label>
        Photos of the dog <span className="optional">optional, up to 4</span>
        <input name="photos" type="file" accept="image/*" multiple />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn-primary" disabled={sending}>
        {sending ? "Sending…" : "Request help"}
      </button>
      <p className="form-note">
        Or call <a href={`tel:${copy.phoneTel}`}>{copy.phoneDisplay}</a>. We use these details only to arrange care. See{" "}
        <a href="/privacy">privacy</a>.
      </p>
    </form>
  );
}
