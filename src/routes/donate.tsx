import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/site/Chrome";
import { useSnapshot } from "@/lib/site/useSite";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Help cover veterinary care | Keeler K9 Services" },
      {
        name: "description",
        content:
          "Donations to Keeler K9 Services help pay for veterinary care for dogs who need placement. Tax receipts are not offered.",
      },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const { copy } = useSnapshot();
  const url = copy.donationUrl.trim();
  const safe = /^https?:\/\//i.test(url);
  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>{copy.donationTitle}</h1>
        <p className="prose">{copy.donationBody}</p>
        {safe ? (
          <p>
            <a className="btn-primary" href={url} target="_blank" rel="noreferrer noopener">
              Donate to veterinary care
            </a>
          </p>
        ) : (
          <p className="prose">
            The payment link is not set up yet. If you want to help with a vet bill, call{" "}
            <a href={`tel:${copy.phoneTel}`}>{copy.phoneDisplay}</a>.
          </p>
        )}
      </main>
    </PublicShell>
  );
}
