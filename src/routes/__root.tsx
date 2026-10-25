import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useHydrateSite } from "@/lib/site/useSite";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";

function SiteHydrator() {
  useHydrateSite();
  return null;
}

function NotFound() {
  return (
    <main className="not-found">
      <img src="/brand/logo-header.webp" alt="" width="72" height="72" />
      <h1>That page is not here</h1>
      <p>The link may be old. Keeler K9 Services is still here to help a dog.</p>
      <p>
        <a className="btn-primary" href="tel:+17446886441">
          Call (744) 688-6441
        </a>
      </p>
      <p>
        <Link to="/">Back to the home page</Link>
      </p>
    </main>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Keeler K9 Services" },
      { name: "theme-color", content: "#0E0F13" },
      {
        name: "description",
        content:
          "Keeler K9 Services helps house and rehome dogs in North Mississauga and Brampton when owners cannot care for them.",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
    ],
  }),
  notFoundComponent: NotFound,
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteHydrator />
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
