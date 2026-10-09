import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useState, type ReactNode } from "react";
import { setPreviewMode, usePreviewMode, useSnapshot } from "@/lib/site/useSite";

const LINKS = [
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About Us" },
  { to: "/pack", label: "The Pack" },
  { to: "/dog-walking", label: "Dog Walking", walking: true },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/mission", label: "Our Mission" },
  { to: "/donate", label: "Donate", donate: true },
] as const;

export function PreviewBanner() {
  const preview = usePreviewMode();
  return (
    <div className="preview-banner" role="status">
      <strong>Preview only.</strong> These updates are not live on keelerk9services.ca.
      {preview ? " You are viewing unpublished edits." : ""}
      {preview && (
        <button type="button" className="banner-exit" onClick={() => setPreviewMode(false)}>
          Exit edit preview
        </button>
      )}
    </div>
  );
}

export function SiteHeader() {
  const { copy } = useSnapshot();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const links = LINKS.filter((item) => !("walking" in item && item.walking) || copy.showWalking);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-bar">
        <Link to="/" className="logo-link" aria-label="Keeler K9 Services home">
          <picture>
            <source srcSet="/brand/logo-header.webp" type="image/webp" />
            <img src="/brand/logo-256.png" alt="Keeler K9 Services" className="logo" width="84" height="84" />
          </picture>
        </Link>
        <div className="header-contact">
          <p className="header-owner">{copy.ownerName}</p>
          <a className="call-link" href={`tel:${copy.phoneTel}`}>
            Call {copy.phoneDisplay}
          </a>
          <p className="header-area">{copy.serviceArea}</p>
        </div>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id={menuId} className={open ? "menu open" : "menu"} aria-label="Main">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={"donate" in item && item.donate ? "menu-donate" : undefined}
              aria-current={path === item.to ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="area-strip">
        {copy.ownerName} · {copy.serviceArea}
      </p>
      {copy.bannerEnabled && copy.bannerText.trim() && <p className="site-banner">{copy.bannerText}</p>}
    </header>
  );
}

export function SiteFooter() {
  const { copy } = useSnapshot();
  return (
    <footer className="site-footer">
      <picture>
        <source srcSet="/brand/logo-footer.webp" type="image/webp" />
        <img src="/brand/logo-256.png" alt="" className="footer-logo" width="48" height="48" />
      </picture>
      <p className="footer-name">Keeler K9 Services</p>
      <p>
        {copy.ownerName}
        <br />
        <a href={`tel:${copy.phoneTel}`}>{copy.phoneDisplay}</a>
        {copy.email ? (
          <>
            <br />
            <a href={`mailto:${copy.email}`}>{copy.email}</a>
          </>
        ) : null}
      </p>
      <p>{copy.serviceArea}</p>
      <p>{copy.footerLine}</p>
      <p className="footer-links">
        <Link to="/privacy">Privacy</Link>
        <Link to="/donate">Veterinary donations</Link>
        <Link to="/admin">Owner tools</Link>
      </p>
      <p className="footer-copy">© {new Date().getFullYear()} Keeler K9 Services</p>
    </footer>
  );
}

export function CallBar() {
  const { copy } = useSnapshot();
  return (
    <a className="call-bar" href={`tel:${copy.phoneTel}`}>
      Need help now? Call {copy.phoneDisplay}
    </a>
  );
}

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="public-site">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <PreviewBanner />
      <SiteHeader />
      <div id="content">{children}</div>
      <SiteFooter />
      <CallBar />
    </div>
  );
}
