import { useEffect, useSyncExternalStore } from "react";
import { useSiteStore } from "./store";
import type { Dog, Photo, Snapshot } from "./types";

const PREVIEW_KEY = "kk9-view-draft";

function subscribePreview(cb: () => void) {
  window.addEventListener("kk9-preview", cb);
  return () => window.removeEventListener("kk9-preview", cb);
}

function readPreview() {
  return sessionStorage.getItem(PREVIEW_KEY) === "1";
}

export function usePreviewMode() {
  return useSyncExternalStore(subscribePreview, readPreview, () => false);
}

export function setPreviewMode(on: boolean) {
  if (on) sessionStorage.setItem(PREVIEW_KEY, "1");
  else sessionStorage.removeItem(PREVIEW_KEY);
  window.dispatchEvent(new Event("kk9-preview"));
}

export function useHydrateSite() {
  useEffect(() => {
    void useSiteStore.persist.rehydrate();
  }, []);
}

export function useSnapshot(): Snapshot {
  const preview = usePreviewMode();
  const draft = useSiteStore((s) => s.draft);
  const published = useSiteStore((s) => s.published);
  return preview ? draft : published;
}

export function coverOf(dog: Pick<Dog, "photos" | "coverId">): Photo | undefined {
  return dog.photos.find((p) => p.id === dog.coverId) ?? dog.photos[0];
}
