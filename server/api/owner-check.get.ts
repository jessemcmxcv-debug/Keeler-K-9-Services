import { getOwnerKey, jsonResponse, keyMatches, type AnyEvent } from "../lib/site-content";

/** Lets Owner tools verify the owner's key before enabling live publishing. */
export default async function handler(event: AnyEvent): Promise<Response> {
  if (!getOwnerKey(event)) return jsonResponse({ ok: false, error: "not-configured" }, 503);
  if (!keyMatches(event)) return jsonResponse({ ok: false, error: "unauthorized" }, 401);
  return jsonResponse({ ok: true });
}
