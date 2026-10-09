import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/site/Chrome";
import { useSnapshot } from "@/lib/site/useSite";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Our Mission | Keeler K9 Services" },
      {
        name: "description",
        content:
          "Keeler K9 Services exists so dogs are not left behind when their owners are incarcerated, hospitalized, or unable to care for them.",
      },
    ],
  }),
  component: MissionPage,
});

function MissionPage() {
  const { copy } = useSnapshot();
  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>Our mission</h1>
        {copy.mission.split(/\n\n+/).map((para) => (
          <p key={para.slice(0, 32)} className="prose mission-card">
            {para}
          </p>
        ))}
      </main>
    </PublicShell>
  );
}
