// Logo background removal, done in the browser (no outside service).
//
// Automatic removal (`autoRemove`):
// 1. the background colours are the most common colours along the image's edge
//    (up to three, for two-tone or gradient backgrounds);
// 2. starting from the edge, pixels close to a background colour are cleared;
//    the fill also follows gentle colour changes (shadows, gradients, JPEG
//    noise), but stops at the logo. With `inside`, background-coloured areas
//    enclosed by the logo (holes in letters) are cleared too;
// 3. leftover specks and tiny islands of background colour are cleaned up;
// 4. pixels on the logo's border get a soft edge with the background tint
//    taken out, so no light or dark halo is left.
//
// The result keeps the original's size so the hand-editing tools (LogoCanvasEditor)
// line up with it; `trimRect` + `exportTrimmed` cut away the empty margins when saving.

export type RemoveOptions = {
  /** 1–100: how different from the background a pixel may be and still be removed. */
  strength: number;
  /** Also clear background-coloured areas enclosed by the logo. */
  inside: boolean;
};

/** The original image, scaled to at most MAX_SIDE, ready for pixel work. */
export type WorkImage = { canvas: HTMLCanvasElement; scale: number; naturalWidth: number; naturalHeight: number };

export type Rect = { x: number; y: number; w: number; h: number };

/** Largest side worked on; bigger logos are scaled down first (still far above the 220 × 100 display size). */
const MAX_SIDE = 1600;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("The logo couldn't be loaded. Upload it again."));
    img.src = src;
  });
}

export async function loadWorkImage(src: string): Promise<WorkImage> {
  const img = await loadImage(src);
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("This browser can't edit images.");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  try {
    ctx.getImageData(0, 0, 1, 1);
  } catch {
    throw new Error("This logo is on another website. Upload the file here first, then edit it.");
  }
  return { canvas, scale, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
}

export const pixels = (canvas: HTMLCanvasElement) => canvas.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, canvas.width, canvas.height);

/** Colour difference close to how eyes see it ("redmean"), roughly 0–270. */
export function colourDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
  const rm = (r1 + r2) / 2;
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt((2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db) / 3;
}

type Rgb = { r: number; g: number; b: number };

/** The background colours along the edge (most common first), or [] when the edge is already transparent. */
function edgeColours(data: Uint8ClampedArray, width: number, height: number): Rgb[] {
  const buckets = new Map<number, { count: number; r: number; g: number; b: number }>();
  let opaque = 0;
  let clear = 0;
  const visit = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    if (data[i + 3] < 32) return void clear++;
    opaque++;
    const key = ((data[i] >> 4) << 8) | ((data[i + 1] >> 4) << 4) | (data[i + 2] >> 4);
    const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
    bucket.count++;
    bucket.r += data[i];
    bucket.g += data[i + 1];
    bucket.b += data[i + 2];
    buckets.set(key, bucket);
  };
  for (let x = 0; x < width; x++) {
    visit(x, 0);
    visit(x, height - 1);
  }
  for (let y = 1; y < height - 1; y++) {
    visit(0, y);
    visit(width - 1, y);
  }
  if (clear > opaque * 1.5) return [];
  const sorted = [...buckets.values()].sort((a, b) => b.count - a.count);
  const picked = sorted.filter((bucket, i) => i === 0 || (i < 3 && bucket.count >= opaque * 0.15));
  return picked.map((bucket) => ({ r: bucket.r / bucket.count, g: bucket.g / bucket.count, b: bucket.b / bucket.count }));
}

/** A copy of `source` with the background removed (same size). `found` is false when the edge was already transparent. */
export function autoRemove(source: ImageData, { strength, inside }: RemoveOptions): { image: ImageData; found: boolean } {
  const { width, height } = source;
  const data = new Uint8ClampedArray(source.data);
  const image = new ImageData(data, width, height);
  const backgrounds = edgeColours(data, width, height);
  if (!backgrounds.length) return { image, found: false };

  const limit = 4 + strength * 0.9;
  const soft = limit * 1.7;
  const step = 4 + strength * 0.2;
  const size = width * height;
  const toBg = new Float32Array(size);
  for (let p = 0; p < size; p++) {
    const i = p * 4;
    let best = Infinity;
    for (const bg of backgrounds) best = Math.min(best, colourDistance(data[i], data[i + 1], data[i + 2], bg.r, bg.g, bg.b));
    toBg[p] = best;
  }
  const clear = (p: number) => data[p * 4 + 3] < 32;
  const between = (p: number, q: number) => colourDistance(data[p * 4], data[p * 4 + 1], data[p * 4 + 2], data[q * 4], data[q * 4 + 1], data[q * 4 + 2]);

  const removed = new Uint8Array(size);
  const queue = new Int32Array(size);
  let head = 0;
  let tail = 0;
  const take = (p: number) => {
    removed[p] = 1;
    queue[tail++] = p;
  };
  // Seeds: the background pixels along the edge.
  for (let x = 0; x < width; x++)
    for (const p of [x, (height - 1) * width + x]) if (!removed[p] && (clear(p) || toBg[p] <= limit)) take(p);
  for (let y = 0; y < height; y++)
    for (const p of [y * width, y * width + width - 1]) if (!removed[p] && (clear(p) || toBg[p] <= limit)) take(p);
  // Grow through background-like pixels, following gentle colour changes.
  const grow = (from: number, p: number) => {
    if (removed[p]) return;
    if (clear(p) || toBg[p] <= limit || (toBg[p] <= limit * 2.2 && between(from, p) <= step)) take(p);
  };
  while (head < tail) {
    const p = queue[head++];
    const x = p % width;
    if (x > 0) grow(p, p - 1);
    if (x < width - 1) grow(p, p + 1);
    if (p >= width) grow(p, p - width);
    if (p < size - width) grow(p, p + width);
  }
  if (inside) for (let p = 0; p < size; p++) if (!removed[p] && toBg[p] <= limit) removed[p] = 1;

  // Specks: background-coloured pixels mostly surrounded by removed ones.
  for (let pass = 0; pass < 2; pass++) {
    const extra: number[] = [];
    for (let p = 0; p < size; p++) {
      if (removed[p] || toBg[p] > soft) continue;
      const x = p % width;
      const y = (p / width) | 0;
      let around = 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height || removed[ny * width + nx]) around++;
        }
      if (around >= 5) extra.push(p);
    }
    for (const p of extra) removed[p] = 1;
  }

  // Islands: tiny background-coloured patches left inside cleared areas.
  const seen = new Uint8Array(size);
  const island = new Int32Array(size);
  const tiny = Math.max(6, Math.round(size * 0.0002));
  for (let start = 0; start < size; start++) {
    if (removed[start] || seen[start]) continue;
    let count = 0;
    let sum = 0;
    let touchesEdge = false;
    let h = 0;
    let t = 0;
    island[t++] = start;
    seen[start] = 1;
    while (h < t) {
      const p = island[h++];
      count++;
      sum += toBg[p];
      const x = p % width;
      if (x === 0 || x === width - 1 || p < width || p >= size - width) touchesEdge = true;
      for (const q of [x > 0 ? p - 1 : -1, x < width - 1 ? p + 1 : -1, p - width, p + width]) {
        if (q < 0 || q >= size || seen[q] || removed[q]) continue;
        seen[q] = 1;
        island[t++] = q;
      }
    }
    if (!touchesEdge && t <= tiny && sum / count <= soft) for (let k = 0; k < t; k++) removed[island[k]] = 1;
  }

  for (let p = 0; p < size; p++) {
    const i = p * 4;
    if (removed[p]) {
      data[i + 3] = 0;
      continue;
    }
    // Soft edge on pixels touching removed ones that still look like the background.
    const x = p % width;
    const touches = (x > 0 && removed[p - 1]) || (x < width - 1 && removed[p + 1]) || (p >= width && removed[p - width]) || (p < size - width && removed[p + width]);
    if (!touches || toBg[p] >= soft) continue;
    const keep = Math.max(0.05, (toBg[p] - limit) / (soft - limit));
    let bg = backgrounds[0];
    let best = Infinity;
    for (const candidate of backgrounds) {
      const d = colourDistance(data[i], data[i + 1], data[i + 2], candidate.r, candidate.g, candidate.b);
      if (d < best) [best, bg] = [d, candidate];
    }
    data[i] = Math.max(0, Math.min(255, (data[i] - bg.r * (1 - keep)) / keep));
    data[i + 1] = Math.max(0, Math.min(255, (data[i + 1] - bg.g * (1 - keep)) / keep));
    data[i + 2] = Math.max(0, Math.min(255, (data[i + 2] - bg.b * (1 - keep)) / keep));
    data[i + 3] = Math.round(data[i + 3] * keep);
  }
  return { image, found: true };
}

/**
 * "Magic erase": clears the area of similar colour around (x, y) — for background
 * left over after the automatic removal. Returns false when there was nothing to clear.
 */
export function magicErase(image: ImageData, x: number, y: number, tolerance: number): boolean {
  const { width, height, data } = image;
  const start = y * width + x;
  if (x < 0 || y < 0 || x >= width || y >= height || data[start * 4 + 3] < 16) return false;
  const [tr, tg, tb] = [data[start * 4], data[start * 4 + 1], data[start * 4 + 2]];
  const limit = 4 + tolerance * 0.9;
  const size = width * height;
  const done = new Uint8Array(size);
  const queue = new Int32Array(size);
  let head = 0;
  let tail = 0;
  done[start] = 1;
  queue[tail++] = start;
  const near = (p: number) => colourDistance(data[p * 4], data[p * 4 + 1], data[p * 4 + 2], tr, tg, tb);
  while (head < tail) {
    const p = queue[head++];
    const px = p % width;
    for (const q of [px > 0 ? p - 1 : -1, px < width - 1 ? p + 1 : -1, p - width, p + width]) {
      if (q < 0 || q >= size || done[q] || data[q * 4 + 3] < 16 || near(q) > limit) continue;
      done[q] = 1;
      queue[tail++] = q;
    }
  }
  for (let k = 0; k < tail; k++) data[queue[k] * 4 + 3] = 0;
  return tail > 0;
}

/** The smallest rectangle around the visible pixels, plus a 2px margin (null if nothing is visible). */
export function trimRect(image: ImageData): Rect | null {
  const { width, height, data } = image;
  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      if (data[(y * width + x) * 4 + 3] > 8) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
  if (right < 0) return null;
  left = Math.max(0, left - 2);
  top = Math.max(0, top - 2);
  right = Math.min(width - 1, right + 2);
  bottom = Math.min(height - 1, bottom + 2);
  return { x: left, y: top, w: right - left + 1, h: bottom - top + 1 };
}

/** A PNG of `rect` from `source`. */
export function exportTrimmed(source: HTMLCanvasElement, rect: Rect): Promise<Blob> {
  const out = document.createElement("canvas");
  out.width = rect.w;
  out.height = rect.h;
  out.getContext("2d")!.drawImage(source, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h);
  return new Promise((resolve, reject) => out.toBlob((b) => (b ? resolve(b) : reject(new Error("The image couldn't be saved."))), "image/png"));
}

/** `rect` (work pixels) in the original image's own pixels, for Client.logoCrop. */
export const toNatural = (rect: Rect, scale: number): Rect => ({ x: Math.round(rect.x / scale), y: Math.round(rect.y / scale), w: Math.round(rect.w / scale), h: Math.round(rect.h / scale) });

export type RemoveResult = { blob: Blob; url: string; width: number; height: number; crop: Rect; image: ImageData };

/** Automatic removal of a logo's background, trimmed and ready to upload (used for the dashboard preview). */
export async function removeBackground(src: string, options: RemoveOptions): Promise<RemoveResult> {
  const work = await loadWorkImage(src);
  const { image, found } = autoRemove(pixels(work.canvas), options);
  if (!found) throw new Error("This logo's background is already transparent. Use “Edit by hand” to clean up any spots.");
  const rect = trimRect(image);
  if (!rect) throw new Error("Everything would be removed. Lower the strength.");
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d")!.putImageData(image, 0, 0);
  const blob = await exportTrimmed(canvas, rect);
  return { blob, url: URL.createObjectURL(blob), width: rect.w, height: rect.h, crop: toNatural(rect, work.scale), image };
}
