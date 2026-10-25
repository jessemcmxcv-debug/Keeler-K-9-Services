import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/site/Chrome";
import { SmartImage } from "@/components/site/SmartImage";
import { founderPhoto } from "@/lib/site/seed";
import { useSnapshot } from "@/lib/site/useSite";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About David Keeler | Keeler K9 Services" },
      {
        name: "description",
        content:
          "Keeler K9 Services, run by David Keeler, houses and rehomes dogs in North Mississauga and Brampton when owners cannot care for them.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { copy } = useSnapshot();
  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>About us</h1>
        {copy.aboutBody.split(/\n\n+/).map((para) => (
          <p key={para.slice(0, 24)} className="prose">
            {para}
          </p>
        ))}
        <figure className="founder">
          <SmartImage photo={founderPhoto} size="full" />
          <figcaption>{copy.aboutCaption}</figcaption>
        </figure>
      </main>
    </PublicShell>
  );
}
