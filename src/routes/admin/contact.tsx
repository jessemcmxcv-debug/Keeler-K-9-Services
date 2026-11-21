import { createFileRoute } from "@tanstack/react-router";
import { telFromDisplay, useSiteStore } from "@/lib/site/store";

export const Route = createFileRoute("/admin/contact")({
  component: ContactAdmin,
});

function ContactAdmin() {
  const copy = useSiteStore((s) => s.draft.copy);
  const update = useSiteStore((s) => s.updateCopy);
  return (
    <main className="admin-page">
      <h1>Contact info</h1>
      <p className="admin-lead">This is the phone number and area people see in the header and footer.</p>
      <label>
        Your name
        <input value={copy.ownerName} onChange={(e) => update({ ownerName: e.target.value })} />
      </label>
      <label>
        Phone number
        <input
          value={copy.phoneDisplay}
          onChange={(e) => update({ phoneDisplay: e.target.value, phoneTel: telFromDisplay(e.target.value) })}
        />
      </label>
      <label>
        Service area
        <input value={copy.serviceArea} onChange={(e) => update({ serviceArea: e.target.value })} />
      </label>
      <label>
        Email
        <span className="field-help">Leave this blank until you have a business email. Nothing is shown until you add one. Do not invent an address.</span>
        <input
          type="email"
          value={copy.email}
          placeholder="Add later"
          onChange={(e) => update({ email: e.target.value.trim() })}
        />
      </label>
    </main>
  );
}
