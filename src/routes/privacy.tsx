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
          This website is a preview. A form submitted here is saved in Owner tools on this device. It is not emailed
          yet{copy.email ? "" : ", because a business email has not been added"}. Before this site replaces the live
          website, ask how requests will be stored and who can see them.
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
