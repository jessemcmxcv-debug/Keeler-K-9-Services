import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/site/Chrome";
import { DogGallery } from "@/components/site/DogGallery";
import { useSnapshot } from "@/lib/site/useSite";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Dogs | Keeler K9 Services" },
      {
        name: "description",
        content:
          "Dogs who have been part of Keeler K9 Services in North Mississauga and Brampton, including dogs looking for placement.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { copy, dogs } = useSnapshot();
  const visible = dogs.filter((d) => d.showInGallery);
  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>Dogs</h1>
        <p className="prose">{copy.galleryIntro}</p>
        {visible.length ? <DogGallery dogs={visible} /> : <p>No dogs are listed right now.</p>}
      </main>
    </PublicShell>
  );
}
