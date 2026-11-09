import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PublicShell } from "@/components/site/Chrome";
import { submitToForminit, toE164 } from "@/lib/site/forminit";
import { newId, useSiteStore } from "@/lib/site/store";
import { useSnapshot } from "@/lib/site/useSite";

export const Route = createFileRoute("/dog-walking")({
  head: () => ({
    meta: [
      { title: "Dog walking in Mississauga and Brampton | Keeler K9 Services" },
      {
        name: "description",
        content:
          "Dog walking with Keeler K9 Services in North Mississauga and Brampton. Placement help for dogs in crisis remains the main service.",
      },
    ],
    links: [{ rel: "canonical", href: "https://keelerk9services.ca/dog-walking" }],
  }),
  component: WalkingPage,
});

function WalkingPage() {
  const { copy } = useSnapshot();
  const addIntake = useSiteStore((s) => s.addIntake);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [invalidField, setInvalidField] = useState("");
  const [sending, setSending] = useState(false);

  function fieldProps(name: string) {
    return {
      "aria-invalid": invalidField === name || undefined,
      "aria-describedby": invalidField === name ? "walking-error" : undefined,
    };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    setInvalidField("");
    const fail = (key: string, message: string) => {
      setError(message);
      setInvalidField(key);
      form.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
    };
    const owner = String(data.get("owner") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const dogName = String(data.get("dogName") || "").trim();
    if (!owner) {
      fail("owner", "Please add your name.");
      return;
    }
    if (!phone) {
      fail("phone", "Please add your phone number.");
      return;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!(phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith("1")))) {
      fail("phone", "Please check the phone number \u2014 it should be 10 digits.");
      return;
    }
    if (!dogName) {
      fail("dogName", "Please add your dog's name.");
      return;
    }
    const email = String(data.get("email") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      fail("email", "Please check the email address \u2014 it looks incomplete.");
      return;
    }
    const address = String(data.get("address") || "").trim();
    const age = String(data.get("age") || "").trim();
    const breed = String(data.get("breed") || "").trim();
    const friendly = String(data.get("friendly") || "");
    const frequency = String(data.get("frequency") || "");

    // Keep a copy in Owner tools on this device, as before.
    try {
      addIntake({
        id: newId(),
        createdAt: new Date().toISOString(),
        kind: "walking",
        status: "new",
        firstName: owner,
        lastName: "",
        phone,
        email,
        dogName,
        dogAge: age,
        breed,
        reason: "Dog walking request",
        urgency: "",
        medical: "",
        medications: "",
        diet: "",
        behaviour: friendly,
        notes: "",
        address,
        frequency,
        friendly,
        photos: [],
      });
    } catch {
      // The Forminit send below is what reaches David; a failed local save
      // should not block it.
    }

    // Send the request through Forminit, to the same form as the live site.
    const payload = new FormData();
    payload.append("fi-sender-fullName", owner);
    payload.append("fi-sender-phone", toE164(phone));
    if (email) payload.append("fi-sender-email", email);
    payload.append("fi-text-requesttype", "Dog walking");
    payload.append("fi-text-dogname", dogName);
    if (breed) payload.append("fi-text-breed", breed);
    if (age) payload.append("fi-text-dogage", age);
    if (address) payload.append("fi-text-address", address);
    if (friendly) payload.append("fi-select-friendly", friendly);
    if (frequency) payload.append("fi-select-frequency", frequency);

    setSending(true);
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

  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>Dog walking</h1>
        <p className="prose">{copy.walkingIntro}</p>
        <p className="prose">
          Call <a href={`tel:${copy.phoneTel}`}>{copy.phoneDisplay}</a> or send the form and we will get back to you.
        </p>
        {done ? (
          <p className="form-success" role="status">
            Walking request sent. Thank you — we will contact you shortly. Please also call {copy.phoneDisplay} if you
            need a reply soon.
          </p>
        ) : (
          <form className="intake-form dark-form" onSubmit={onSubmit} noValidate>
            <label>
              Your name
              <input name="owner" autoComplete="name" required {...fieldProps("owner")} />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" autoComplete="tel" required {...fieldProps("phone")} />
            </label>
            <label>
              Email <span className="optional">optional</span>
              <input name="email" type="email" autoComplete="email" {...fieldProps("email")} />
            </label>
            <label>
              Home address in Mississauga or Brampton <span className="optional">optional</span>
              <input name="address" autoComplete="street-address" {...fieldProps("address")} />
            </label>
            <label>
              Dog's name
              <input name="dogName" required {...fieldProps("dogName")} />
            </label>
            <label>
              Breed <span className="optional">optional</span>
              <input name="breed" {...fieldProps("breed")} />
            </label>
            <label>
              Age <span className="optional">optional</span>
              <input name="age" {...fieldProps("age")} />
            </label>
            <label>
              Friendly with other dogs?
              <select name="friendly" defaultValue="Not sure" {...fieldProps("friendly")}>
                <option>Yes</option>
                <option>No</option>
                <option>Not sure</option>
              </select>
            </label>
            <label>
              How often?
              <select name="frequency" defaultValue="A few times a week" {...fieldProps("frequency")}>
                <option>Once a day</option>
                <option>Twice a day</option>
                <option>A few times a week</option>
              </select>
            </label>
            {error && (
              <p className="form-error" role="alert" id="walking-error">
                {error}
              </p>
            )}
            <button className="btn-primary" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send walking request"}
            </button>
          </form>
        )}
      </main>
    </PublicShell>
  );
}
