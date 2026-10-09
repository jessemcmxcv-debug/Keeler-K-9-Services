import { createFileRoute } from "@tanstack/react-router";
import { useSiteStore } from "@/lib/site/store";

export const Route = createFileRoute("/admin/donations")({
  component: DonationsAdmin,
});

function DonationsAdmin() {
  const copy = useSiteStore((s) => s.draft.copy);
  const update = useSiteStore((s) => s.updateCopy);
  const url = copy.donationUrl.trim();
  const ok = /^https?:\/\//i.test(url);
  return (
    <main className="admin-page">
      <h1>Donations</h1>
      <p className="admin-lead">
        Paste the real veterinary donation link when you have one. Until then, the website tells people to call. No payment account has been invented.
      </p>
      <label>
        Veterinary donation link
        <span className="field-help">A full link starting with https://</span>
        <input
          value={copy.donationUrl}
          placeholder="https://"
          onChange={(e) => update({ donationUrl: e.target.value.trim() })}
        />
      </label>
      <label>
        Donation heading
        <input value={copy.donationTitle} onChange={(e) => update({ donationTitle: e.target.value })} />
      </label>
      <label>
        Donation message
        <textarea rows={4} value={copy.donationBody} onChange={(e) => update({ donationBody: e.target.value })} />
      </label>
      <p>{ok ? "This link will open when someone taps Donate." : "No working link yet. The Donate page will ask people to call."}</p>
    </main>
  );
}
