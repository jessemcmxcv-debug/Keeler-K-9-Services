import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  checkOwnerKey,
  getStoredOwnerKey,
  pushLiveSnapshot,
  storeOwnerKey,
} from "@/lib/site/liveContent";
import { isDirty, useSiteStore } from "@/lib/site/store";
import { setPreviewMode } from "@/lib/site/useSite";

type GateState = "checking" | "locked" | "unlocked";

export function AdminShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const draft = useSiteStore((s) => s.draft);
  const published = useSiteStore((s) => s.published);
  const publish = useSiteStore((s) => s.publish);
  const dirty = JSON.stringify(draft) !== JSON.stringify(published);
  const [ask, setAsk] = useState(false);
  const [toast, setToast] = useState("");
  const [toastIsError, setToastIsError] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [gate, setGate] = useState<GateState>("checking");
  const [keyInput, setKeyInput] = useState("");
  const [gateError, setGateError] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const stored = getStoredOwnerKey();
    if (!stored) {
      setGate("locked");
      return;
    }
    void checkOwnerKey(stored).then((ok) => setGate(ok ? "unlocked" : "locked"));
  }, []);

  async function unlock() {
    const key = keyInput.trim();
    if (!key) return;
    setUnlocking(true);
    setGateError("");
    const ok = await checkOwnerKey(key);
    setUnlocking(false);
    if (!ok) {
      setGateError("That key was not accepted. Check it and try again.");
      return;
    }
    storeOwnerKey(key);
    setKeyInput("");
    setGate("unlocked");
  }

  function lock() {
    storeOwnerKey("");
    setGate("locked");
  }

  async function publishLive() {
    if (!isDirty()) return;
    setPublishing(true);
    publish();
    setPreviewMode(false);
    setAsk(false);
    const snapshot = useSiteStore.getState().published;
    try {
      await pushLiveSnapshot(snapshot, getStoredOwnerKey());
      setToastIsError(false);
      setToast("Published — the live website now shows these changes for every visitor.");
    } catch (err) {
      setToastIsError(true);
      setToast(
        err instanceof Error
          ? `${err.message} Your changes are saved here, but the live site was not updated.`
          : "The live update did not go through. Your changes are saved here, but the live site was not updated.",
      );
    } finally {
      setPublishing(false);
    }
  }

  if (gate !== "unlocked") {
    return (
      <div className="admin">
        <header className="admin-top">
          <span className="admin-brand">Keeler K9 owner tools</span>
          <Link to="/" className="admin-back">
            View website
          </Link>
        </header>
        <div className="admin-body">
          <h1>Owner sign-in</h1>
          <p className="prose">
            Owner tools can change the live website, so they are locked with the owner key. Enter it once on
            this device to unlock.
          </p>
          {gate === "checking" ? (
            <p role="status">Checking…</p>
          ) : (
            <form
              className="intake-form"
              onSubmit={(e) => {
                e.preventDefault();
                void unlock();
              }}
            >
              <label>
                Owner key
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </label>
              {gateError && (
                <p className="form-error" role="alert">
                  {gateError}
                </p>
              )}
              <button type="submit" className="btn-primary" disabled={unlocking}>
                {unlocking ? "Checking…" : "Unlock owner tools"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <p className="preview-banner" role="status">
        <strong>Owner tools.</strong> Edits are saved on this device until you publish them — publishing updates
        the live website for everyone.
      </p>
      <header className="admin-top">
        <Link to="/admin" className="admin-brand">
          Keeler K9 owner tools
        </Link>
        <span>
          <Link to="/" className="admin-back">
            View website
          </Link>{" "}
          <button type="button" className="admin-back" onClick={lock}>
            Lock
          </button>
        </span>
      </header>
      <div className="admin-body">{children}</div>
      <div className="publish-bar">
        <p>{dirty ? "You have changes that are not live yet." : "The live website matches what you last published."}</p>
        <div className="publish-actions">
          <Link to="/" className="btn-ghost" onClick={() => setPreviewMode(true)}>
            Preview website
          </Link>
          <button
            type="button"
            className="btn-primary"
            disabled={!dirty || publishing}
            onClick={() => {
              setToast("");
              setAsk(true);
            }}
          >
            {publishing ? "Publishing…" : "Publish changes"}
          </button>
        </div>
      </div>
      {ask && (
        <div className="modal-back" role="presentation">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="publish-title">
            <h2 id="publish-title">Publish these changes?</h2>
            <p>This updates the live website at keelerk9services.ca for every visitor, right away.</p>
            <div className="modal-actions">
              <button type="button" className="btn-ghost" onClick={() => setAsk(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" disabled={publishing} onClick={() => void publishLive()}>
                {publishing ? "Publishing…" : "Publish live"}
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && path.startsWith("/admin") && (
        <p className="admin-toast" role="status" data-error={toastIsError || undefined}>
          {toast}
        </p>
      )}
    </div>
  );
}
