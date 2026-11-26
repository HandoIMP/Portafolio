import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve('public/assets-general');

const RENAMES = [
  { from: '5x7 win in silence.jpg', to: '5x7-win-in-silence.webp', convert: true },
  { from: 'color pallets.png', to: 'color-pallets.webp', convert: true },
  { from: 'llavero imprudente.webp', to: 'llavero-imprudente.webp', convert: false },
];

async function run() {
  for (const item of RENAMES) {
    const srcPath = path.join(ASSETS_DIR, item.from);
    const destPath = path.join(ASSETS_DIR, item.to);

    try {
      await fs.access(srcPath);
    } catch {
      console.log(`Saltando ${item.from} (no existe).`);
      continue;
    }

    if (item.convert) {
      await sharp(srcPath).webp({ quality: 84 }).toFile(destPath);
      await fs.unlink(srcPath);
      const stat = await fs.stat(destPath);
      console.log(`Convertido ${item.from} -> ${item.to} (${(stat.size / 1024).toFixed(1)} KB)`);
    } else {
      await fs.rename(srcPath, destPath);
      console.log(`Renombrado ${item.from} -> ${item.to}`);
    }
  }
}

run().catch((err) => {
  console.error('Error convirtiendo assets:', err);
  process.exit(1);
});
