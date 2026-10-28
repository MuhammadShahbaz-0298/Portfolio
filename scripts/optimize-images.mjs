// One-time image optimizer: resizes and recompresses the photos to the
// sizes and format actually used by the page (WebP is much smaller than
// JPEG at the same quality). Run with:  npm run optimize-images
// Use it again whenever you replace a screenshot or portrait — bigger
// files than the page displays just slow the site down for no reason.
//
// Targets:
//   - portrait: shown at max 192 CSS px  -> 480 px covers retina (2x+)
//   - project shots: featured card ~564 CSS px -> 1120 px covers 2x
import { copyFile, readFile, unlink } from 'node:fs/promises';
import { statSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const jobs = [
  { input: 'public/images/muhammad-shahbaz.webp', width: 480 },
  { input: 'public/projects/bookstore.jpg', output: 'public/projects/bookstore.webp', width: 1120 },
  { input: 'public/projects/campus-coin.jpg', output: 'public/projects/campus-coin.webp', width: 1120 },
  { input: 'public/projects/school-portal.jpg', output: 'public/projects/school-portal.webp', width: 1120 },
];

const kb = (n) => `${Math.round(n / 1024)} KB`;

for (const { input: file, output = file, width } of jobs) {
  const before = statSync(file).size;
  // Read into memory first: if sharp opens the file itself it keeps the
  // handle while encoding, and Windows then blocks the overwrite below.
  const data = await readFile(file);
  const meta = await sharp(data).metadata();
  const temp = path.join(path.dirname(file), `.opt-${path.basename(file)}`);

  await sharp(data)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(temp);

  await copyFile(temp, output); // write (or overwrite) the result
  await unlink(temp);
  if (output !== file) await unlink(file); // old format no longer needed

  const after = statSync(output).size;
  console.log(
    `${path.basename(output)}: ${meta.width}x${meta.height} ${kb(before)} -> ${kb(after)} (-${Math.round((1 - after / before) * 100)}%)`
  );
}
