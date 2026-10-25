import type { Photo } from "@/lib/site/types";

export function SmartImage({
  photo,
  size = "thumb",
  alt,
  className,
  loading = "lazy",
}: {
  photo: Photo;
  size?: "thumb" | "full";
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const webp = size === "full" ? photo.full : photo.thumb;
  const jpg = size === "full" ? photo.fallbackFull : photo.fallbackThumb;
  const type = size === "full" ? photo.fullType : photo.thumbType;
  const label = alt ?? photo.alt;
  if (!webp || type === "image/jpeg" || webp === jpg) {
    return <img src={jpg || webp} alt={label} className={className} loading={loading} decoding="async" />;
  }
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={jpg} alt={label} className={className} loading={loading} decoding="async" />
    </picture>
  );
}
