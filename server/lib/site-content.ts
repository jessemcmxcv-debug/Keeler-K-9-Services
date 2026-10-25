/**
 * Shared helpers for the live site-content API (server/api/site-content.*).
 *
 * The published site snapshot (copy, dogs, testimonials) lives in a Cloudflare
 * KV namespace bound as `SITE_KV`, under one key. Writes require the owner key
 * (env `OWNER_PUBLISH_KEY`), which the owner enters once in Owner tools.
 */

export const SITE_CONTENT_KEY = "published-snapshot-v1";
const MAX_SNAPSHOT_BYTES = 20 * 1024 * 1024;

type KvNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

type AnyEvent = {
  req: Request & {
    runtime?: { cloudflare?: { env?: Record<string, unknown> } };
  };
  url: URL;
  context?: Record<string, unknown> & {
    cloudflare?: { env?: Record<string, unknown> };
  };
};

function cloudflareEnv(event: AnyEvent): Record<string, unknown> | undefined {
  // Nitro v3's Cloudflare runtime attaches the worker env to the request;
  // the context path is kept as a fallback for other runtimes.
  return event.req.runtime?.cloudflare?.env ?? event.context?.cloudflare?.env;
}

export function getKv(event: AnyEvent): KvNamespace | null {
  const env = cloudflareEnv(event);
  const kv = env?.["SITE_KV"];
  if (kv && typeof (kv as KvNamespace).get === "function") return kv as KvNamespace;
  return null;
}

export function getOwnerKey(event: AnyEvent): string | null {
  const env = cloudflareEnv(event);
  const fromBinding = env?.["OWNER_PUBLISH_KEY"];
  if (typeof fromBinding === "string" && fromBinding.trim()) return fromBinding.trim();
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  const fromProcess = proc?.env?.["OWNER_PUBLISH_KEY"];
  if (typeof fromProcess === "string" && fromProcess.trim()) return fromProcess.trim();
  return null;
}

export function providedKey(event: AnyEvent): string | null {
  const k = event.req.headers.get("x-owner-key");
  return k && k.trim() ? k.trim() : null;
}

export function keyMatches(event: AnyEvent): boolean {
  const expected = getOwnerKey(event);
  const provided = providedKey(event);
  if (!expected || !provided || expected.length !== provided.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i += 1) diff |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  return diff === 0;
}

export function isSnapshotShape(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const v = value as { copy?: unknown; dogs?: unknown; testimonials?: unknown };
  return (
    !!v.copy && typeof v.copy === "object" && Array.isArray(v.dogs) && Array.isArray(v.testimonials)
  );
}

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export { MAX_SNAPSHOT_BYTES };
export type { AnyEvent };
