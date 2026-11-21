import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/site/types";
import { SmartImage } from "./SmartImage";

export function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const count = photos.length;
  const photo = photos[index];

  // On open, remember what had focus and put focus on Close; on unmount,
  // give focus back to the thumbnail that opened the lightbox.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % count);
      if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
      if (e.key === "Tab") {
        // Keep keyboard focus inside the dialog while it is open.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [count, index, onClose, onIndex]);

  if (!photo) return null;

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.alt}. Photo ${index + 1} of ${count}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => setStartX(e.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (startX == null) return;
        const diff = startX - (e.changedTouches[0]?.clientX ?? startX);
        if (diff > 50) onIndex((index + 1) % count);
        if (diff < -50) onIndex((index - 1 + count) % count);
        setStartX(null);
      }}
    >
      <button ref={closeRef} className="lightbox-btn lightbox-close" type="button" onClick={onClose}>
        Close
      </button>
      {count > 1 && (
        <button
          className="lightbox-btn lightbox-prev"
          type="button"
          aria-label="Previous photo"
          onClick={() => onIndex((index - 1 + count) % count)}
        >
          ‹
        </button>
      )}
      <SmartImage photo={photo} size="full" className="lightbox-img" loading="eager" />
      {count > 1 && (
        <button
          className="lightbox-btn lightbox-next"
          type="button"
          aria-label="Next photo"
          onClick={() => onIndex((index + 1) % count)}
        >
          ›
        </button>
      )}
      <p className="lightbox-count">
        {index + 1} / {count}
      </p>
    </div>
  );
}
