import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

interface CategoryConfig {
  dir: string;
  canvasWidth: number;
  canvasHeight: number;
  fillRatio: number;
}

const CATEGORIES: CategoryConfig[] = [
  { dir: 'foodItems', canvasWidth: 1000, canvasHeight: 1000, fillRatio: 0.85 },
  { dir: 'rentacarCars', canvasWidth: 1200, canvasHeight: 900, fillRatio: 0.80 },
];

async function normalizeImage(filePath: string, config: CategoryConfig) {
  const image = sharp(filePath, { failOn: 'none' });

  // 1) Trim transparent/empty edges
  const trimmedBuffer = await image.trim({ threshold: 10 }).toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();

  const trimmedW = trimmedMeta.width!;
  const trimmedH = trimmedMeta.height!;

  // 2) Proportional resize
  const maxSubjectW = Math.round(config.canvasWidth * config.fillRatio);
  const maxSubjectH = Math.round(config.canvasHeight * config.fillRatio);

  const resizedBuffer = await sharp(trimmedBuffer)
    .resize({
      width: maxSubjectW,
      height: maxSubjectH,
      fit: 'inside',
      withoutEnlargement: false,
    })
    .toBuffer();
    
  const resizedMeta = await sharp(resizedBuffer).metadata();

  // 3) Center it on a fixed-size transparent canvas
  const finalBuffer = await sharp({
    create: {
      width: config.canvasWidth,
      height: config.canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resizedBuffer, gravity: 'center' }])
    .png()
    .toBuffer();

  return {
    buffer: finalBuffer,
    trimmedW,
    trimmedH,
    resizedW: resizedMeta.width,
    resizedH: resizedMeta.height
  };
}

async function main() {
  const testImagesDir = path.resolve('testimages');

  for (const config of CATEGORIES) {
    const dir = path.join(testImagesDir, config.dir);
    if (!fs.existsSync(dir)) {
        console.error(`❌ SKIPPED directory not found: ${dir}`);
        continue;
    }
    
    const backupDir = path.join(testImagesDir, '_originals_backup', config.dir);
    fs.mkdirSync(backupDir, { recursive: true });

    const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.png'));
    console.log(`\n📂 ${config.dir} — ${files.length} files`);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const backupPath = path.join(backupDir, file);

      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
      }

      try {
        const { buffer, trimmedW, trimmedH, resizedW, resizedH } = await normalizeImage(backupPath, config);
        fs.writeFileSync(filePath, buffer);
        console.log(`✅ ${config.dir}/${file} — trimmed ${trimmedW}x${trimmedH} → normalized ${config.canvasWidth}x${config.canvasHeight} (subject ${resizedW}x${resizedH})`);
      } catch (err) {
        console.error(`❌ SKIPPED ${config.dir}/${file}:`, (err as Error).message);
      }
    }
  }

  console.log('\n🎉 Image normalization complete.');
}

main();
