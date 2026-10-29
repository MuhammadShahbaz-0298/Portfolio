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
  const data = await readFile(input);
  const meta = await sharp(data).metadata();
  const base = input.replace(/\.\w+$/, '.webp');

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

  if (base !== input) await unlink(input);

  console.log(
    `${path.basename(base)}: ${meta.width}x${meta.height} -> ` +
      widths.map((w) => `${w}w ${kb(statSync(w === widths[0] ? base : base.replace('.webp', `-${w}.webp`)).size)}`).join(', ') +
      ` (${kb(total)} total)`
  );
}
