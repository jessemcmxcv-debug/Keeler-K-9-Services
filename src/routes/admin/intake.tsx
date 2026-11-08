import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSiteStore } from "@/lib/site/store";
import type { Intake, IntakeStatus } from "@/lib/site/types";
import { INTAKE_STATUS_LABEL } from "@/lib/site/types";

export const Route = createFileRoute("/admin/intake")({
  component: IntakePage,
});

const STATUSES: IntakeStatus[] = ["new", "contacted", "in_progress", "placed", "closed"];

function IntakePage() {
  const intakes = useSiteStore((s) => s.intakes);
  const setStatus = useSiteStore((s) => s.setIntakeStatus);
  const [openId, setOpenId] = useState<string | null>(intakes[0]?.id ?? null);

  return (
    <main className="admin-page">
      <h1>Intake requests</h1>
      <p className="admin-lead">
        Requests sent from this phone or computer show up here. They are not emailed yet. Tap a request, then tap a status.
      </p>
      {intakes.length === 0 && <p>No requests yet.</p>}
      <ul className="inbox">
        {intakes.map((item) => (
          <li key={item.id}>
            <button type="button" className="inbox-row" onClick={() => setOpenId(item.id === openId ? null : item.id)}>
              <strong>
                {item.kind === "walking" ? "Walking" : item.urgency || "Placement"} · {item.dogName || "Dog"}
              </strong>
              <span>
                {item.firstName} {item.lastName} · {INTAKE_STATUS_LABEL[item.status]}
              </span>
            </button>
            {openId === item.id && <IntakeDetail item={item} onStatus={(status) => setStatus(item.id, status)} />}
          </li>
        ))}
      </ul>
    </main>
  );
}

function IntakeDetail({ item, onStatus }: { item: Intake; onStatus: (status: IntakeStatus) => void }) {
  const when = new Date(item.createdAt).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" });
  const rows: [string, string][] = [
    ["When", when],
    ["Name", `${item.firstName} ${item.lastName}`.trim()],
    ["Phone", item.phone],
    ["Email", item.email],
    ["Dog", item.dogName],
    ["Age", item.dogAge],
    ["Breed", item.breed],
    ["Urgency", item.urgency],
    ["Reason", item.reason],
    ["Medical", item.medical],
    ["Medications", item.medications],
    ["Special diet", item.diet],
    ["Behaviour", item.behaviour || item.friendly],
    ["Address", item.address],
    ["How often", item.frequency],
    ["Other", item.notes],
  ];
  return (
    <div className="inbox-detail">
      <div className="status-buttons">
        {STATUSES.map((status) => (
          <button key={status} type="button" className={item.status === status ? "btn-primary" : "btn-ghost"} onClick={() => onStatus(status)}>
            {INTAKE_STATUS_LABEL[status]}
          </button>
        ))}
      </div>
      <dl>
        {rows
          .filter(([, value]) => value.trim())
          .map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
      </dl>
      {item.photos.length > 0 && (
        <div className="inbox-photos">
          {item.photos.map((p) => (
            <img key={p.id} src={p.dataUrl} alt="Photo sent with the request" />
          ))}
        </div>
      )}
      {item.phone && (
        <p>
          <a className="btn-primary" href={`tel:${item.phone.replace(/[^\d+]/g, "")}`}>
            Call {item.phone}
          </a>
        </p>
      )}
    </div>
  );
}
