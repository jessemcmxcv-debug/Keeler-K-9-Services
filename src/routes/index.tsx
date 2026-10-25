import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PublicShell } from "@/components/site/Chrome";
import { IntakeForm } from "@/components/site/IntakeForm";
import { SmartImage } from "@/components/site/SmartImage";
import { coverOf, useSnapshot } from "@/lib/site/useSite";
import type { Dog } from "@/lib/site/types";
import type { Photo } from "@/lib/site/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keeler K9 Services | Dog placement in Mississauga and Brampton" },
      {
        name: "description",
        content:
          "No dogs left behind. Keeler K9 Services helps house and rehome dogs in North Mississauga and Brampton when owners are incarcerated, hospitalized, or unable to care for them. Call (744) 688-6441.",
      },
      { property: "og:title", content: "Keeler K9 Services" },
      {
        property: "og:description",
        content: "Emergency dog placement and rehoming in North Mississauga and Brampton. Call (744) 688-6441.",
      },
      { property: "og:image", content: "/brand/logo-256.png" },
    ],
  }),
  component: Home,
});

function Home() {
  const { copy, dogs } = useSnapshot();
  const slides = dogs
    .filter((d) => d.showInGallery && d.photos.length)
    .slice(0, 4)
    .map((d) => ({ dog: d, photo: coverOf(d) }))
    .filter((s): s is { dog: Dog; photo: Photo } => Boolean(s.photo));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!copy.showSlider || paused || slides.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((n) => (n + 1) % slides.length), 4000);
    return () => window.clearInterval(id);
  }, [copy.showSlider, paused, slides.length]);

  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Keeler K9 Services",
    description: copy.homepageLead,
    telephone: copy.phoneTel,
    areaServed: ["North Mississauga", "Brampton"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    founder: { "@type": "Person", name: copy.ownerName },
    url: "https://keelerk9services.ca/",
  };

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="hero">
        <div className="hero-inner">
          <h1>Keeler K9 Services</h1>
          <p className="hero-lead">{copy.homepageHeadline}</p>
          <p className="hero-sub">{copy.homepageLead}</p>
          <p className="hero-area">
            {copy.serviceArea}
            {copy.ownerName ? ` · ${copy.ownerName}` : ""}
          </p>
          {copy.showSlider && slides.length > 0 && slides[index]?.photo && (
            <div className="slider">
              <SmartImage
                photo={slides[index].photo}
                size="thumb"
                alt={slides[index].photo.alt || slides[index].dog.name}
                loading="eager"
              />
              {slides.length > 1 && (
                <button type="button" className="slider-pause" onClick={() => setPaused((p) => !p)}>
                  {paused ? "Play photos" : "Pause photos"}
                </button>
              )}
            </div>
          )}
          <div className="hero-actions">
            <a className="btn-primary" href="#intake">
              Request help
            </a>
            <a className="btn-ghost" href={`tel:${copy.phoneTel}`}>
              Call {copy.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="band">
        <h2>What we do</h2>
        <div className="features">
          {[
            [copy.feature1Title, copy.feature1Text],
            [copy.feature2Title, copy.feature2Text],
            [copy.feature3Title, copy.feature3Text],
          ].map(([title, text]) => (
            <article key={title} className="card">
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band" id="intake">
        <h2>Ask for placement</h2>
        <div className="next-box">
          <h3>What happens next</h3>
          <p>{copy.whatHappensNext}</p>
        </div>
        <IntakeForm />
      </section>
    </PublicShell>
  );
}
