import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/site/Chrome";
import { useSnapshot } from "@/lib/site/useSite";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials | Keeler K9 Services" },
      {
        name: "description",
        content: "Real words from families who have trusted Keeler K9 Services with their dogs.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { testimonials } = useSnapshot();
  const visible = testimonials.filter((t) => t.visible && t.quote.trim() && t.name.trim());
  return (
    <PublicShell>
      <main className="page dark-page">
        <h1>Testimonials</h1>
        {visible.length === 0 ? (
          <p className="prose">
            Real stories from families will be posted here. We do not use made-up reviews.
          </p>
        ) : (
          <div className="testimonial-grid">
            {visible.map((t) => (
              <blockquote key={t.id} className="quote-card">
                <p>“{t.quote}”</p>
                <footer>
                  — {t.name}
                  {t.detail ? `, ${t.detail}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </main>
    </PublicShell>
  );
}
