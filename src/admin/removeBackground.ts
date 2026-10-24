// Removes a logo's plain background in the browser (no outside service):
// 1. the background colour is the most common colour along the image's edge;
// 2. pixels close to it are cleared, starting from the edge, so the same colour
//    inside the logo stays (unless `inside` is on, e.g. for the holes in letters);
// 3. pixels on the border get a soft edge, with the background tint taken out
//    so no light or dark halo is left;
// 4. empty margins are trimmed so the logo fills its box on the website.

export type RemoveOptions = {
  /** 1–100: how different from the background a pixel may be and still be removed. */
  strength: number;
  /** Also clear background-coloured areas enclosed by the logo. */
  inside: boolean;
};

export type RemoveResult = { blob: Blob; url: string; width: number; height: number };

/** Largest side processed; bigger logos are scaled down first (still far above the 220 × 100 display size). */
const MAX_SIDE = 1600;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("The logo couldn't be loaded. Upload it again."));
    img.src = src;
  });
}

/** The background colour, or null when the edge is already transparent. */
function edgeColour(data: Uint8ClampedArray, width: number, height: number) {
  const buckets = new Map<number, { count: number; r: number; g: number; b: number }>();
  let total = 0;
  let clear = 0;
  const visit = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    total++;
    if (data[i + 3] < 32) return void clear++;
    // Group similar colours (16 levels per channel) and average within the group.
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
  if (clear / total > 0.6) return null;
  let best: { count: number; r: number; g: number; b: number } | undefined;
  for (const bucket of buckets.values()) if (!best || bucket.count > best.count) best = bucket;
  return best ? { r: best.r / best.count, g: best.g / best.count, b: best.b / best.count } : null;
}

export async function removeBackground(src: string, { strength, inside }: RemoveOptions): Promise<RemoveResult> {
  const img = await loadImage(src);
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("This browser can't edit images.");
  ctx.drawImage(img, 0, 0, width, height);

  let image: ImageData;
  try {
    image = ctx.getImageData(0, 0, width, height);
  } catch {
    throw new Error("This logo is on another website. Upload the file here first, then remove its background.");
  }
  const { data } = image;
  const bg = edgeColour(data, width, height);
  if (!bg) throw new Error("This logo's background is already transparent.");

  // Colour distance (0–441) under which a pixel counts as background, and the soft band above it.
  const limit = 6 + strength * 1.4;
  const soft = limit * 1.6;
  const distance = (p: number) => {
    const i = p * 4;
    return Math.hypot(data[i] - bg.r, data[i + 1] - bg.g, data[i + 2] - bg.b);
  };

  const size = width * height;
  const removed = new Uint8Array(size);
  if (inside) {
    for (let p = 0; p < size; p++) if (data[p * 4 + 3] < 32 || distance(p) <= limit) removed[p] = 1;
  } else {
    // Flood fill from the edge through background-coloured pixels only.
    const queue = new Int32Array(size);
    let head = 0;
    let tail = 0;
    const push = (p: number) => {
      if (removed[p] || (data[p * 4 + 3] >= 32 && distance(p) > limit)) return;
      removed[p] = 1;
      queue[tail++] = p;
    };
    for (let x = 0; x < width; x++) {
      push(x);
      push((height - 1) * width + x);
    }
    for (let y = 0; y < height; y++) {
      push(y * width);
      push(y * width + width - 1);
    }
    while (head < tail) {
      const p = queue[head++];
      const x = p % width;
      if (x > 0) push(p - 1);
      if (x < width - 1) push(p + 1);
      if (p >= width) push(p - width);
      if (p < size - width) push(p + width);
    }
  }

  for (let p = 0; p < size; p++) {
    const i = p * 4;
    if (removed[p]) {
      data[i + 3] = 0;
      continue;
    }
    // Soft edge: only pixels touching removed ones, and still close to the background colour.
    const x = p % width;
    const touches = (x > 0 && removed[p - 1]) || (x < width - 1 && removed[p + 1]) || (p >= width && removed[p - width]) || (p < size - width && removed[p + width]);
    if (!touches) continue;
    const d = distance(p);
    if (d >= soft) continue;
    const keep = Math.max(0.05, (d - limit) / (soft - limit));
    // Take the background tint out of the edge colour, then fade it.
    data[i] = Math.max(0, Math.min(255, (data[i] - bg.r * (1 - keep)) / keep));
    data[i + 1] = Math.max(0, Math.min(255, (data[i + 1] - bg.g * (1 - keep)) / keep));
    data[i + 2] = Math.max(0, Math.min(255, (data[i + 2] - bg.b * (1 - keep)) / keep));
    data[i + 3] = Math.round(data[i + 3] * keep);
  }

  // Trim empty margins (keeping 2px), so the logo fills its box.
  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 8) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) throw new Error("Everything would be removed. Lower the strength.");
  left = Math.max(0, left - 2);
  top = Math.max(0, top - 2);
  right = Math.min(width - 1, right + 2);
  bottom = Math.min(height - 1, bottom + 2);
  ctx.putImageData(image, 0, 0);

  const out = document.createElement("canvas");
  out.width = right - left + 1;
  out.height = bottom - top + 1;
  out.getContext("2d")!.drawImage(canvas, left, top, out.width, out.height, 0, 0, out.width, out.height);
  const blob = await new Promise<Blob>((resolve, reject) => out.toBlob((b) => (b ? resolve(b) : reject(new Error("The image couldn't be saved."))), "image/png"));
  return { blob, url: URL.createObjectURL(blob), width: out.width, height: out.height };
}
