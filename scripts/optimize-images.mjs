// Image optimizer: resizes and recompresses the photos to the widths the
// page actually uses (they are declared in the srcSetWidths prop of each
// <SmartImage> call — Hero.jsx and ProjectCard.jsx). Run with:
//   npm run optimize-images
// Use it again whenever you replace a screenshot or portrait: files bigger
// than the screen displays just slow the site down for no reason.
//
// Every job lists its widths largest-first. The largest keeps the plain
// filename (that is the one referenced in src/data/); the smaller ones
// become file-<width>.ext, which is what srcset serves to phones.
//   - portrait: shown at 160-192 CSS px  -> 360/480 px covers 1x-2x
//   - project shots: 192 px thumbnails, ~500 px featured cards
//     -> 400 / 720 / 1120 px covers 1x-2x at every breakpoint
import { copyFile, readFile, unlink } from 'node:fs/promises';
import { statSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const jobs = [
  { input: 'public/images/muhammad-shahbaz.webp', widths: [480, 360] },
  { input: 'public/projects/bookstore.webp', widths: [1120, 720, 400] },
  { input: 'public/projects/campus-coin.webp', widths: [1120, 720, 400] },
  { input: 'public/projects/school-portal.webp', widths: [1120, 720, 400] },
];

const kb = (n) => `${Math.round(n / 1024)} KB`;

for (const { input, widths } of jobs) {
  // Read into memory first: if sharp opens the file itself it keeps the
  // handle while encoding, and Windows then blocks the overwrite below.
  const data = await readFile(input);
  const meta = await sharp(data).metadata();
  const base = input.replace(/\.\w+$/, '.webp'); // always output WebP

  let total = 0;
  for (const width of widths) {
    const target =
      width === widths[0]
        ? base
        : base.replace('.webp', `-${width}.webp`);
    const temp = path.join(path.dirname(base), `.opt-${path.basename(target)}`);

    await sharp(data)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(temp);

    await copyFile(temp, target);
    await unlink(temp);
    total += statSync(target).size;
  }

  // A fresh drop may still be jpg/png — the plain filename is now .webp.
  if (base !== input) await unlink(input);

  console.log(
    `${path.basename(base)}: ${meta.width}x${meta.height} -> ` +
      widths.map((w) => `${w}w ${kb(statSync(w === widths[0] ? base : base.replace('.webp', `-${w}.webp`)).size)}`).join(', ') +
      ` (${kb(total)} total)`
  );
}
