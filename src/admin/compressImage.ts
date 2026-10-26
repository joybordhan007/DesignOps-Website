// Makes big photos fit the upload limit in the browser, before they are sent:
// an image over 10 MB is re-saved at a smaller resolution and/or quality until
// it is under 10 MB, but never below Full HD (1920 px on its long side), so it
// stays sharp on the website. WebP keeps transparency (logos) and is small.
// SVG and GIF files are left alone (vector / animation).

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

/** Long-side sizes tried in turn: 4K, 1440p, then Full HD (never upscaled). */
const SIDES = [3840, 2560, 1920];
const QUALITIES = [0.92, 0.85, 0.78, 0.7];

export type Compressed = { file: File; note?: string };

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

function encode(source: ImageBitmap, width: number, height: number, type: string, quality: number): Promise<Blob | null> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.resolve(null);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, width, height);
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function compressImage(file: File): Promise<Compressed> {
  if (!file.type.startsWith("image/") || /svg|gif/.test(file.type) || file.size <= MAX_IMAGE_BYTES) return { file };
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return { file }; // a format this browser can't open: upload as it is
  }
  try {
    const longSide = Math.max(bitmap.width, bitmap.height);
    // JPEG for browsers that can't write WebP, except for images that may be transparent.
    const probe = await encode(bitmap, 1, 1, "image/webp", 0.8);
    const type = probe?.type === "image/webp" ? "image/webp" : /png|webp|avif/.test(file.type) ? "image/png" : "image/jpeg";
    const sides = [...new Set(SIDES.map((side) => Math.min(side, longSide)))];
    let best: Blob | null = null;
    let size = { width: bitmap.width, height: bitmap.height };
    for (const side of sides) {
      const scale = side / longSide;
      const width = Math.round(bitmap.width * scale);
      const height = Math.round(bitmap.height * scale);
      for (const quality of type === "image/png" ? [1] : QUALITIES) {
        const blob = await encode(bitmap, width, height, type, quality);
        if (!blob) continue;
        if (!best || blob.size < best.size) {
          best = blob;
          size = { width, height };
        }
        if (blob.size <= MAX_IMAGE_BYTES) {
          const name = file.name.replace(/\.[^.]+$/, "") + (type === "image/webp" ? ".webp" : type === "image/png" ? ".png" : ".jpg");
          return { file: new File([blob], name, { type }), note: `Made smaller for the web: ${mb(file.size)} → ${mb(blob.size)} (${width} × ${height} px, still HD).` };
        }
        // Far too big at this size: a lower quality won't be enough, so go straight to the next size.
        if (blob.size > MAX_IMAGE_BYTES * 2) break;
      }
    }
    // Still over 10 MB at Full HD (very rare): send the smallest version made.
    if (best && best.size < file.size) {
      const name = file.name.replace(/\.[^.]+$/, "") + (type === "image/webp" ? ".webp" : type === "image/png" ? ".png" : ".jpg");
      return { file: new File([best], name, { type }), note: `Made smaller: ${mb(file.size)} → ${mb(best.size)} (${size.width} × ${size.height} px).` };
    }
    return { file };
  } finally {
    bitmap.close();
  }
}
