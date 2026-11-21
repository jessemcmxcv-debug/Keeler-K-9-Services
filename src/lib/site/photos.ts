import type { Photo } from "./types";
import { newId } from "./store";

export async function compressFile(file: File, max: number, quality: number): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not read that photo.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", quality);
}

export async function photoFromFile(file: File, alt: string): Promise<Photo> {
  const [full, thumb] = await Promise.all([compressFile(file, 1280, 0.78), compressFile(file, 640, 0.74)]);
  const id = newId();
  return {
    id,
    alt,
    thumb,
    full,
    thumbType: "image/jpeg",
    fullType: "image/jpeg",
    fallbackThumb: thumb,
    fallbackFull: full,
  };
}
