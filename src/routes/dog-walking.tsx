import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PublicShell } from "@/components/site/Chrome";
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
  }),
  component: WalkingPage,
});

function WalkingPage() {
  const { copy } = useSnapshot();
  const addIntake = useSiteStore((s) => s.addIntake);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const owner = String(data.get("owner") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const dogName = String(data.get("dogName") || "").trim();
    if (!owner || !phone || !dogName) {
      setError("Please add your name, phone, and your dog's name.");
      return;
    }
    addIntake({
      id: newId(),
      createdAt: new Date().toISOString(),
      kind: "walking",
      status: "new",
      firstName: owner,
      lastName: "",
      phone,
      email: String(data.get("email") || "").trim(),
      dogName,
      dogAge: String(data.get("age") || "").trim(),
      breed: String(data.get("breed") || "").trim(),
      reason: "Dog walking request",
      urgency: "",
      medical: "",
      medications: "",
      diet: "",
      behaviour: String(data.get("friendly") || ""),
      notes: "",
      address: String(data.get("address") || "").trim(),
      frequency: String(data.get("frequency") || ""),
      friendly: String(data.get("friendly") || ""),
      photos: [],
    });
    setDone(true);
  }

  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>Dog walking</h1>
        <p className="prose">{copy.walkingIntro}</p>
        <p className="prose">
          Call <a href={`tel:${copy.phoneTel}`}>{copy.phoneDisplay}</a> or send the form. Requests stay in Owner tools on this
          device until email delivery is set up.
        </p>
        {done ? (
          <p className="form-success" role="status">
            Walking request saved. Please also call {copy.phoneDisplay} if you need a reply soon.
          </p>
        ) : (
          <form className="intake-form dark-form" onSubmit={onSubmit}>
            <label>
              Your name
              <input name="owner" required />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" required />
            </label>
            <label>
              Email <span className="optional">optional</span>
              <input name="email" type="email" />
            </label>
            <label>
              Home address in Mississauga or Brampton
              <input name="address" autoComplete="street-address" />
            </label>
            <label>
              Dog's name
              <input name="dogName" required />
            </label>
            <label>
              Breed <span className="optional">optional</span>
              <input name="breed" />
            </label>
            <label>
              Age <span className="optional">optional</span>
              <input name="age" />
            </label>
            <label>
              Friendly with other dogs?
              <select name="friendly" defaultValue="Not sure">
                <option>Yes</option>
                <option>No</option>
                <option>Not sure</option>
              </select>
            </label>
            <label>
              How often?
              <select name="frequency" defaultValue="A few times a week">
                <option>Once a day</option>
                <option>Twice a day</option>
                <option>A few times a week</option>
              </select>
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="btn-primary" type="submit">
              Send walking request
            </button>
          </form>
        )}
      </main>
    </PublicShell>
  );
}
