/*
 * Renderiza a propaganda em MP4 (1920×1080, 30 fps) quadro a quadro.
 *   npx http-server -p 4173 .          (na raiz do repositório)
 *   node propaganda/render.mjs [saida.mp4] [--stills 1,5,10]
 * Requer Playwright (Chromium) e ffmpeg no PATH.
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const stillsIdx = args.indexOf('--stills');
const stills = stillsIdx >= 0 ? args[stillsIdx + 1].split(',').map(Number) : null;
const out = (stillsIdx === 0 ? null : args[0]) || 'propaganda/duett-propaganda.mp4';
const url = process.env.URL || 'http://localhost:4173/propaganda/?render=1';
const FPS = 30;

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

if (stills) {
  for (const t of stills) {
    await page.evaluate((t) => window.__seek(t), t);
    await page.screenshot({ path: `${process.env.STILLS_DIR || '.'}/still-${t}.jpg`, quality: 80 });
  }
  await browser.close();
  process.exit(0);
}

const dur = await page.evaluate(() => window.__duration);
const frames = Math.ceil(dur * FPS);
const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', out],
  { stdio: ['pipe', 'inherit', 'inherit'] });

for (let f = 0; f < frames; f++) {
  await page.evaluate((t) => window.__seek(t), f / FPS);
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (f % 150 === 0) console.log(`quadro ${f}/${frames}`);
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await browser.close();
console.log('pronto:', out);
