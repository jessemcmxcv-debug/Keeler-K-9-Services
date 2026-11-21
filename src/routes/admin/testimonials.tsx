import { createFileRoute } from "@tanstack/react-router";
import { newId, useSiteStore } from "@/lib/site/store";
import type { Testimonial } from "@/lib/site/types";

export const Route = createFileRoute("/admin/testimonials")({
  component: TestimonialsAdmin,
});

function TestimonialsAdmin() {
  const items = useSiteStore((s) => s.draft.testimonials);
  const setItems = useSiteStore((s) => s.setTestimonials);

  function update(id: string, partial: Partial<Testimonial>) {
    setItems(items.map((item) => (item.id === id ? { ...item, ...partial } : item)));
  }

  return (
    <main className="admin-page">
      <h1>Testimonials</h1>
      <p className="admin-lead">
        Only add words a real person said, and use their real first name. If you do not have one yet, leave this empty.
      </p>
      <button
        type="button"
        className="btn-primary big-add"
        onClick={() => setItems([{ id: newId(), quote: "", name: "", detail: "", visible: false }, ...items])}
      >
        + Add a testimonial
      </button>
      {items.length === 0 && <p>No testimonials yet. The website will say stories will be posted when you have them.</p>}
      {items.map((item) => (
        <form key={item.id} className="admin-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            What they said
            <textarea rows={4} value={item.quote} onChange={(e) => update(item.id, { quote: e.target.value })} />
          </label>
          <label>
            Their first name
            <input value={item.name} onChange={(e) => update(item.id, { name: e.target.value })} />
          </label>
          <label>
            City or detail <span className="optional">optional</span>
            <input value={item.detail} onChange={(e) => update(item.id, { detail: e.target.value })} placeholder="Example: Brampton" />
          </label>
          <label className="check">
            <input type="checkbox" checked={item.visible} onChange={(e) => update(item.id, { visible: e.target.checked })} />
            Show this on the website after I publish
          </label>
          <button type="button" className="btn-danger" onClick={() => setItems(items.filter((row) => row.id !== item.id))}>
            Remove
          </button>
        </form>
      ))}
    </main>
  );
}
