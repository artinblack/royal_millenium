import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Minimal pdfjs-dist usage in Node
const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs').catch(() => import('pdfjs-dist'));

const pdfPath = path.join(__dirname, 'proj_assets', 'RM final .pdf');
const data = new Uint8Array(fs.readFileSync(pdfPath));

const loadingTask = pdfjsLib.getDocument({ data, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true });
const pdf = await loadingTask.promise;
console.log(`PDF has ${pdf.numPages} pages`);

const dir = path.join(__dirname, 'temporary screenshots');

for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');

  await page.render({ canvasContext: ctx, viewport }).promise;

  const outPath = path.join(dir, `pdf-render-page-${i}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`Saved pdf-render-page-${i}.png (${viewport.width}x${viewport.height})`);
}
