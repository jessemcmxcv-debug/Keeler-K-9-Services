import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSiteStore } from "@/lib/site/store";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const copy = useSiteStore((s) => s.draft.copy);
  const update = useSiteStore((s) => s.updateCopy);
  const discard = useSiteStore((s) => s.discardDraft);
  const reset = useSiteStore((s) => s.resetDraftToOriginal);
  const [note, setNote] = useState("");
  return (
    <main className="admin-page">
      <h1>Website settings</h1>
      <p className="admin-lead">Only a few switches. Nothing technical.</p>
      <label className="check">
        <input type="checkbox" checked={copy.showWalking} onChange={(e) => update({ showWalking: e.target.checked })} />
        Show Dog Walking in the menu
      </label>
      <label className="check">
        <input type="checkbox" checked={copy.showSlider} onChange={(e) => update({ showSlider: e.target.checked })} />
        Show dog photos on the home page
      </label>
      <p className="field-help">This preview is hidden from search engines until you decide to go live.</p>
      <div className="modal-actions">
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            if (window.confirm("Throw away unpublished edits and go back to the last published preview?")) {
              discard();
              setNote("Unpublished edits were cleared.");
            }
          }}
        >
          Undo unpublished edits
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => {
            if (window.confirm("Replace your current edits with the original Keeler wording? This does not publish by itself.")) {
              reset();
              setNote("Edits were reset to the original wording. Publish only if you want the preview to match.");
            }
          }}
        >
          Restore original wording
        </button>
      </div>
      {note && <p role="status">{note}</p>}
    </main>
  );
}
