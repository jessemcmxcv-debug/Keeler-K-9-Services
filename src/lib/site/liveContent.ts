import type { Snapshot } from "./types";

const OWNER_KEY_STORAGE = "kk9-owner-key";

export function getStoredOwnerKey(): string {
  try {
    return localStorage.getItem(OWNER_KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

export function storeOwnerKey(key: string) {
  try {
    if (key) localStorage.setItem(OWNER_KEY_STORAGE, key);
    else localStorage.removeItem(OWNER_KEY_STORAGE);
  } catch {
    // storage unavailable; key simply won't persist on this device
  }
}

/** The live snapshot published from Owner tools, if one exists on the server. */
export async function fetchLiveSnapshot(): Promise<Snapshot | null> {
  try {
    const res = await fetch("/api/site-content", { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const data = (await res.json()) as { snapshot?: Snapshot | null };
    const snap = data?.snapshot;
    if (snap && typeof snap === "object" && snap.copy && Array.isArray(snap.dogs)) return snap;
    return null;
  } catch {
    return null;
  }
}

export async function checkOwnerKey(key: string): Promise<boolean> {
  try {
    const res = await fetch("/api/owner-check", { headers: { "x-owner-key": key } });
    return res.ok;
  } catch {
    return false;
  }
}

/** Push a snapshot live. Throws an Error with a plain-language message on failure. */
export async function pushLiveSnapshot(snapshot: Snapshot, key: string): Promise<void> {
  let res: Response;
  try {
    res = await fetch("/api/site-content", {
      method: "PUT",
      headers: { "content-type": "application/json", "x-owner-key": key },
      body: JSON.stringify({ snapshot }),
    });
  } catch {
    throw new Error("Could not reach the website server. Check your connection and try again.");
  }
  if (res.status === 401) throw new Error("That owner key was not accepted. Re-enter it in Owner tools.");
  if (res.status === 503) throw new Error("Live publishing is not set up on the server yet.");
  if (!res.ok) throw new Error("The live update did not go through. Nothing was changed on the live site.");
}
