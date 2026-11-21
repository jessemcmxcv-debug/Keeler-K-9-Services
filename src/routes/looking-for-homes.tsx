import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PublicShell } from "@/components/site/Chrome";
import { Lightbox } from "@/components/site/Lightbox";
import { SmartImage } from "@/components/site/SmartImage";
import { coverOf, useSnapshot } from "@/lib/site/useSite";
import type { Dog } from "@/lib/site/types";

export const Route = createFileRoute("/looking-for-homes")({
  head: () => ({
    meta: [
      { title: "Dogs Looking for Homes | Keeler K9 Services" },
      {
        name: "description",
        content:
          "Meet the dogs in Keeler K9 Services' care who are looking for a new home in North Mississauga and Brampton. Tap a dog to read their story.",
      },
    ],
    links: [{ rel: "canonical", href: "https://keelerk9services.ca/looking-for-homes" }],
  }),
  component: LookingForHomesPage,
});

function metaLine(dog: Dog): string {
  return [dog.breed, dog.age, dog.sex].filter(Boolean).join(" · ");
}

function LookingForHomesPage() {
  const { copy, dogs } = useSnapshot();
  const homes = dogs.filter((d) => d.showOnHomes);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = homes.find((d) => d.id === selectedId) ?? null;

  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>Dogs Looking for Homes</h1>
        <p className="prose">
          Sometimes a dog in our care needs a different future. The dogs below are looking for a new home. Tap a dog
          to see their photos, read their story, and find out why they need a new home.
        </p>
        <p className="prose">
          Think one of them could be yours? Call us at{" "}
          <a href={`tel:${copy.phoneTel}`}>{copy.phoneDisplay}</a> or start with the{" "}
          <Link to="/" hash="intake">
            request form
          </Link>{" "}
          and tell us which dog you are asking about.
        </p>

        {homes.length === 0 ? (
          <p className="homes-empty">
            No dogs are looking for a home right now. When a dog in our care needs a new home, you will find them
            here.
          </p>
        ) : (
          <div className="gallery-grid homes-grid">
            {homes.map((dog, i) => {
              const cover = coverOf(dog);
              return (
                <article key={dog.id} className="dog-card homes-card">
                  <button
                    type="button"
                    className="dog-toggle"
                    aria-haspopup="dialog"
                    onClick={() => setSelectedId(dog.id)}
                  >
                    {cover ? (
                      <SmartImage photo={cover} alt="" loading={i < 4 ? "eager" : "lazy"} />
                    ) : (
                      <span className="homes-no-photo">Photo coming soon</span>
                    )}
                    <span className="dog-name">{dog.name}</span>
                    {metaLine(dog) && <span className="homes-meta">{metaLine(dog)}</span>}
                    <span className="status-pill">Looking for a home</span>
                    <span className="dog-toggle-hint">Tap to meet {dog.name || "this dog"}</span>
                  </button>
                </article>
              );
            })}
          </div>
        )}

        {selected && (
          <DogDetail dog={selected} phoneDisplay={copy.phoneDisplay} phoneTel={copy.phoneTel} onClose={() => setSelectedId(null)} />
        )}
      </main>
    </PublicShell>
  );
}

function DogDetail({
  dog,
  phoneDisplay,
  phoneTel,
  onClose,
}: {
  dog: Dog;
  phoneDisplay: string;
  phoneTel: string;
  onClose: () => void;
}) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = dog.photos[photoIndex] ?? dog.photos[0];
  const firstName = dog.name || "This dog";

  // Focus the Close button on open and return focus to the card on close;
  // lock body scroll while the overlay is up.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, onClose]);

  return (
    <div
      className="homes-overlay-back"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className="homes-overlay" role="dialog" aria-modal="true" aria-label={`Meet ${firstName}`}>
        <button ref={closeRef} type="button" className="homes-close" onClick={onClose}>
          Close
        </button>
        <h2 className="homes-detail-name">{dog.name}</h2>
        {metaLine(dog) && <p className="homes-meta homes-detail-meta">{metaLine(dog)}</p>}

        {photo && (
          <>
            <button
              type="button"
              className="homes-main-photo"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Open photo of ${firstName} full screen`}
            >
              <SmartImage photo={photo} size="full" loading="eager" />
            </button>
            {dog.photos.length > 1 && (
              <ul className="dog-thumbs homes-thumbs">
                {dog.photos.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={i === photoIndex ? "thumb-btn homes-thumb-active" : "thumb-btn"}
                      onClick={() => setPhotoIndex(i)}
                      aria-label={`Show photo ${i + 1} of ${firstName}`}
                      aria-current={i === photoIndex}
                    >
                      <SmartImage photo={p} loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {dog.story && (
          <section className="homes-section">
            <h3>About {firstName}</h3>
            <p>{dog.story}</p>
          </section>
        )}
        {dog.rehomingReason && (
          <section className="homes-section">
            <h3>Why {firstName} needs a new home</h3>
            <p>{dog.rehomingReason}</p>
          </section>
        )}
        {dog.behaviour && (
          <section className="homes-section">
            <h3>Good to know</h3>
            <p>{dog.behaviour}</p>
          </section>
        )}

        <div className="homes-actions">
          <a className="btn-primary homes-call" href={`tel:${phoneTel}`}>
            Call {phoneDisplay}
          </a>
          <Link className="btn-ghost homes-ask" to="/" hash="intake">
            Ask about {firstName}
          </Link>
        </div>
      </div>
      {lightboxOpen && dog.photos.length > 0 && (
        <Lightbox
          photos={dog.photos}
          index={photoIndex}
          onClose={() => setLightboxOpen(false)}
          onIndex={setPhotoIndex}
        />
      )}
    </div>
  );
}
