import { useState } from "react";
import { coverOf } from "@/lib/site/useSite";
import type { Dog } from "@/lib/site/types";
import { STATUS_LABEL } from "@/lib/site/types";
import { Lightbox } from "./Lightbox";
import { SmartImage } from "./SmartImage";

export function DogGallery({ dogs, heading }: { dogs: Dog[]; heading?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ dogId: string; index: number } | null>(null);
  const groups: { key: Dog["status"]; title: string }[] = [
    { key: "looking", title: "Looking for placement" },
    { key: "unavailable", title: "Temporarily unavailable" },
    { key: "placed", title: "Successfully placed" },
    { key: "archived", title: "Part of our story" },
  ];

  const openDog = dogs.find((d) => d.id === lightbox?.dogId);

  return (
    <div>
      {heading ? <h2 className="section-title">{heading}</h2> : null}
      {groups.map((group) => {
        const list = dogs.filter((d) => d.status === group.key);
        if (!list.length) return null;
        return (
          <section key={group.key} className="dog-group" aria-labelledby={`group-${group.key}`}>
            <h3 id={`group-${group.key}`}>{group.title}</h3>
            <div className="gallery-grid">
              {list.map((dog, cardIndex) => {
                const cover = coverOf(dog);
                const open = activeId === dog.id;
                return (
                  <article key={dog.id} className={open ? "dog-card active" : "dog-card"}>
                    <button
                      type="button"
                      className="dog-toggle"
                      aria-expanded={open}
                      onClick={() => setActiveId(open ? null : dog.id)}
                    >
                      {cover && (
                        <SmartImage photo={cover} alt="" loading={cardIndex < 4 ? "eager" : "lazy"} />
                      )}
                      <span className="dog-name">{dog.name}</span>
                      <span className="status-pill">{STATUS_LABEL[dog.status]}</span>
                      <span className="dog-toggle-hint">{open ? "Hide photos" : "Read story and photos"}</span>
                    </button>
                    {open && (
                      <div className="dog-expand">
                        {dog.story && <p className="dog-story">{dog.story}</p>}
                        {(dog.breed || dog.age || dog.sex) && (
                          <p className="dog-meta">
                            {[dog.breed, dog.sex, dog.age].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        <ul className="dog-thumbs">
                          {dog.photos.map((p, i) => (
                            <li key={p.id}>
                              <button
                                type="button"
                                className="thumb-btn"
                                onClick={() => setLightbox({ dogId: dog.id, index: i })}
                                aria-label={`Open photo ${i + 1} of ${dog.name}`}
                              >
                                <SmartImage photo={p} loading="lazy" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
      {lightbox && openDog && (
        <Lightbox
          photos={openDog.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndex={(index) => setLightbox({ dogId: openDog.id, index })}
        />
      )}
    </div>
  );
}
