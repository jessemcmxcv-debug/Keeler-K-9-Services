import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { isDirty, useSiteStore } from "@/lib/site/store";
import { setPreviewMode } from "@/lib/site/useSite";

export function AdminShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const draft = useSiteStore((s) => s.draft);
  const published = useSiteStore((s) => s.published);
  const publish = useSiteStore((s) => s.publish);
  const dirty = JSON.stringify(draft) !== JSON.stringify(published);
  const [ask, setAsk] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="admin">
      <p className="preview-banner" role="status">
        <strong>Preview only.</strong> Publishing here does not change keelerk9services.ca.
      </p>
      <header className="admin-top">
        <Link to="/admin" className="admin-brand">
          Keeler K9 owner tools
        </Link>
        <Link to="/" className="admin-back">
          View website
        </Link>
      </header>
      <div className="admin-body">{children}</div>
      <div className="publish-bar">
        <p>{dirty ? "You have changes that are not on the preview website yet." : "The preview website matches what you last published."}</p>
        <div className="publish-actions">
          <Link
            to="/"
            className="btn-ghost"
            onClick={() => setPreviewMode(true)}
          >
            Preview website
          </Link>
          <button type="button" className="btn-primary" disabled={!dirty} onClick={() => { setDone(false); setAsk(true); }}>
            Publish changes
          </button>
        </div>
      </div>
      {ask && (
        <div className="modal-back" role="presentation">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="publish-title">
            <h2 id="publish-title">Publish these changes?</h2>
            <p>This updates the preview website only. It does not change the live site at keelerk9services.ca.</p>
            <div className="modal-actions">
              <button type="button" className="btn-ghost" onClick={() => setAsk(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  if (!isDirty()) return;
                  publish();
                  setPreviewMode(false);
                  setAsk(false);
                  setDone(true);
                }}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
      {done && path.startsWith("/admin") && (
        <p className="admin-toast" role="status">
          Preview updated. The live website was not changed.
        </p>
      )}
    </div>
  );
}
