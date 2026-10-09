import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicShell } from "@/components/site/Chrome";
import { Lightbox } from "@/components/site/Lightbox";
import { SmartImage } from "@/components/site/SmartImage";
import { useSnapshot } from "@/lib/site/useSite";

export const Route = createFileRoute("/pack")({
  head: () => ({
    meta: [
      { title: "The Pack | Keeler K9 Services" },
      {
        name: "description",
        content: "Angel, Duke, and Emily — the family story behind Keeler K9 Services.",
      },
    ],
  }),
  component: PackPage,
});

function PackPage() {
  const { copy, dogs } = useSnapshot();
  const pack = dogs.filter((d) => d.showInPack);
  const [open, setOpen] = useState<{ dogId: string; index: number } | null>(null);
  const dog = pack.find((d) => d.id === open?.dogId);
  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>The Pack</h1>
        <p className="prose">{copy.packIntro}</p>
        {pack.map((member) => (
          <section key={member.id} className="pack-block">
            <h2>{member.name}</h2>
            <p>{member.packBlurb || member.story}</p>
            <ul className="dog-thumbs light-gap">
              {member.photos.slice(0, 6).map((p, i) => (
                <li key={p.id}>
                  <button type="button" className="thumb-btn" aria-label={`Open photo of ${member.name}`} onClick={() => setOpen({ dogId: member.id, index: i })}>
                    <SmartImage photo={p} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {open && dog && (
          <Lightbox photos={dog.photos} index={open.index} onClose={() => setOpen(null)} onIndex={(index) => setOpen({ dogId: dog.id, index })} />
        )}
      </main>
    </PublicShell>
  );
}
