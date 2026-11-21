import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicShell } from "@/components/site/Chrome";
import { PROPOSAL_INTRO, PROPOSAL_SECTIONS, type ProposalBlock } from "@/lib/site/proposal-content";

export const Route = createFileRoute("/proposal")({
  head: () => ({
    meta: [
      { title: "The Proposal — The Sanctuary | Keeler K9 Services" },
      {
        name: "description",
        content:
          "The Sanctuary: Dave Keeler's concept master plan for a self-supporting, self-sustaining dog sanctuary on 200 acres in Northern Ontario — kennels, aquaculture, greenhouses, and green energy, held under the Keeler Family Foundation.",
      },
    ],
    links: [{ rel: "canonical", href: "https://keelerk9services.ca/proposal" }],
  }),
  component: ProposalPage,
});

function Block({ block }: { block: ProposalBlock }) {
  switch (block.type) {
    case "h":
      return <h3 className="proposal-subhead">{block.text}</h3>;
    case "lead":
      return (
        <p className="prose">
          <strong className="proposal-lead">{block.title}</strong> {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="proposal-list">
          {block.items.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="proposal-list">
          {block.items.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ol>
      );
    case "note":
      return <p className="proposal-note">{block.text}</p>;
    default:
      return <p className="prose">{block.text}</p>;
  }
}

function ProposalPage() {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <PublicShell>
      <main className="page dark-page">
        <p className="proposal-eyebrow">{PROPOSAL_INTRO.eyebrow}</p>
        <h1>The Proposal</h1>
        <p className="prose proposal-standfirst">{PROPOSAL_INTRO.standfirst}</p>
        <figure className="proposal-hero">
          <picture>
            <source srcSet="/proposal/sanctuary-concept.webp" type="image/webp" />
            <img
              src="/proposal/sanctuary-concept.jpg"
              alt="Watercolour concept illustration of the 200-acre Sanctuary layout: forest around the edges, a lake and creek through the middle, fenced dog yards, greenhouses, gardens, solar panels, and the main buildings on cleared higher ground"
              loading="eager"
              decoding="async"
            />
          </picture>
          <figcaption>{PROPOSAL_INTRO.imageCaption}</figcaption>
        </figure>
        <blockquote className="proposal-quote">
          “{PROPOSAL_INTRO.quote}” <cite>— {PROPOSAL_INTRO.quoteBy}</cite>
        </blockquote>
        <ul className="glance-list" aria-label="The Sanctuary at a glance">
          {PROPOSAL_INTRO.glance.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <p className="proposal-note">{PROPOSAL_INTRO.statusNote}</p>
        <p className="prose proposal-hint">Tap a section to open it — the full plan, one piece at a time.</p>
        {PROPOSAL_SECTIONS.map((section) => {
          const isOpen = open.has(section.id);
          return (
            <section key={section.id} className={isOpen ? "proposal-box open" : "proposal-box"}>
              <h2 className="proposal-box-heading">
                <button
                  type="button"
                  className="proposal-box-head"
                  aria-expanded={isOpen}
                  aria-controls={`proposal-body-${section.id}`}
                  onClick={() => toggle(section.id)}
                >
                  <span>
                    <span className="proposal-box-title">{section.title}</span>
                    {section.sub ? <span className="proposal-box-sub">{section.sub}</span> : null}
                  </span>
                  <span className="proposal-chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>
              </h2>
              {isOpen ? (
                <div className="proposal-body" id={`proposal-body-${section.id}`}>
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </main>
    </PublicShell>
  );
}
