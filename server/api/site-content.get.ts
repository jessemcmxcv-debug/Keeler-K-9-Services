import { SITE_CONTENT_KEY, getKv, jsonResponse, type AnyEvent } from "../lib/site-content";

/** Public read: the live published snapshot, or null if none has been pushed yet. */
export default async function handler(event: AnyEvent): Promise<Response> {
  const kv = getKv(event);
  if (!kv) return jsonResponse({ snapshot: null, configured: false });
  try {
    const raw = await kv.get(SITE_CONTENT_KEY);
    if (!raw) return jsonResponse({ snapshot: null, configured: true });
    return jsonResponse({ snapshot: JSON.parse(raw), configured: true });
  } catch {
    return jsonResponse({ snapshot: null, configured: true, error: "read-failed" }, 502);
  }
}
