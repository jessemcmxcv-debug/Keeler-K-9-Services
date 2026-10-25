import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/site/Chrome";
import { useSnapshot } from "@/lib/site/useSite";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | Keeler K9 Services" },
      {
        name: "description",
        content: "How Keeler K9 Services uses the information you send about yourself and your dog.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { copy } = useSnapshot();
  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>Privacy</h1>
        <p className="prose">
          If you contact {copy.ownerName} at Keeler K9 Services, we use your name, phone, email, and what you tell us
          about your dog only to respond and to arrange care. We do not sell that information.
        </p>
        <p className="prose">
          Photos you upload are there so we can recognize your dog and understand their condition. Please do not send
          information you are not comfortable sharing for that purpose.
        </p>
        <p className="prose">
          Intake requests sent from this site are delivered to Keeler K9 Services through our form provider
          (Forminit), the same service the previous website used, so we can respond and arrange care.
        </p>
        <p className="prose">
          To talk to a person, call <a href={`tel:${copy.phoneTel}`}>{copy.phoneDisplay}</a>
          {copy.email ? (
            <>
              {" "}
              or email <a href={`mailto:${copy.email}`}>{copy.email}</a>
            </>
          ) : null}
          . Service area: {copy.serviceArea}.
        </p>
      </main>
    </PublicShell>
  );
}
