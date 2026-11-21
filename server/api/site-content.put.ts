import {
  MAX_SNAPSHOT_BYTES,
  SITE_CONTENT_KEY,
  getKv,
  isSnapshotShape,
  jsonResponse,
  keyMatches,
  type AnyEvent,
} from "../lib/site-content";

/** Owner-only write: store a new live snapshot. Requires the x-owner-key header. */
export default async function handler(event: AnyEvent): Promise<Response> {
  const kv = getKv(event);
  if (!kv) return jsonResponse({ ok: false, error: "storage-not-configured" }, 503);
  if (!keyMatches(event)) return jsonResponse({ ok: false, error: "unauthorized" }, 401);

  const bodyText = await event.req.text();
  if (bodyText.length > MAX_SNAPSHOT_BYTES) {
    return jsonResponse({ ok: false, error: "snapshot-too-large" }, 413);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    return jsonResponse({ ok: false, error: "invalid-json" }, 400);
  }
  const snapshot = (parsed as { snapshot?: unknown })?.snapshot ?? parsed;
  if (!isSnapshotShape(snapshot)) {
    return jsonResponse({ ok: false, error: "invalid-snapshot" }, 400);
  }
  await kv.put(SITE_CONTENT_KEY, JSON.stringify(snapshot));
  return jsonResponse({ ok: true });
}
