import { createFileRoute, Link } from "@tanstack/react-router";
import { useSiteStore } from "@/lib/site/store";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

const CARDS = [
  { to: "/admin/dogs", icon: "🐕", title: "Dogs", text: "Add, edit, or remove a dog." },
  { to: "/admin/photos", icon: "📸", title: "Photos", text: "Add photos to a dog." },
  { to: "/admin/intake", icon: "📋", title: "Intake requests", text: "See new requests and update them." },
  { to: "/admin/messages", icon: "💬", title: "Messages", text: "Change the words on the website." },
  { to: "/admin/testimonials", icon: "⭐", title: "Testimonials", text: "Add a real family's words. No made-up reviews." },
  { to: "/admin/gallery", icon: "🖼️", title: "Gallery", text: "Choose which dogs show, and in what order." },
  { to: "/admin/contact", icon: "📞", title: "Contact info", text: "Phone, area, and email." },
  { to: "/admin/donations", icon: "❤️", title: "Donations", text: "Paste the veterinary donation link when you have it." },
  { to: "/admin/settings", icon: "⚙️", title: "Website settings", text: "A few simple on/off choices." },
] as const;

function AdminHome() {
  const intakes = useSiteStore((s) => s.intakes);
  const fresh = intakes.filter((i) => i.status === "new").length;
  return (
    <main className="admin-page">
      <h1>Hello David</h1>
      <p className="admin-lead">
        Tap a big button. Change what you need. Then tap <strong>Preview website</strong> to look, and{" "}
        <strong>Publish changes</strong> when you are happy. Nothing here goes onto the live site by itself.
      </p>
      {fresh > 0 && (
        <p className="admin-alert">
          {fresh} new request{fresh === 1 ? "" : "s"}.{" "}
          <Link to="/admin/intake">Open intake requests</Link>
        </p>
      )}
      <div className="admin-grid">
        {CARDS.map((card) => (
          <Link key={card.to} to={card.to} className="admin-card">
            <span className="admin-icon" aria-hidden="true">
              {card.icon}
            </span>
            <span className="admin-card-title">{card.title}</span>
            <span className="admin-card-text">{card.text}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
