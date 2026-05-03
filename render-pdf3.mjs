import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/AB/Desktop/royal_millenium/temporary screenshots';
const pdfFilePath = path.resolve('C:/Users/AB/Desktop/royal_millenium/proj_assets/RM final .pdf');

// Read PDF as base64 to inject directly
const pdfBase64 = fs.readFileSync(pdfFilePath).toString('base64');

const html = `<!DOCTYPE html>
<html>
<head><style>*{margin:0;padding:0;background:#444;}canvas{display:block;margin:0 auto 10px;}</style></head>
<body>
<div id="pages"></div>
<script type="module">
const b64 = '${pdfBase64.substring(0, 100)}...'; // test
</script>
<script>window.__b64='${pdfBase64}';</script>
<script type="module">
import * as pdfjsLib from '/node_modules/pdfjs-dist/build/pdf.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.mjs';

const b64 = window.__b64;
const bin = atob(b64);
const arr = new Uint8Array(bin.length);
for(let i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i);

const pdf = await pdfjsLib.getDocument({data:arr}).promise;
window.__total = pdf.numPages;
const container = document.getElementById('pages');

for(let i=1;i<=Math.min(pdf.numPages,5);i++){
  const page = await pdf.getPage(i);
  const vp = page.getViewport({scale:1.5});
  const canvas = document.createElement('canvas');
  canvas.width = vp.width; canvas.height = vp.height;
  canvas.id = 'page-'+i;
  container.appendChild(canvas);
  await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
  window.__rendered = i;
}
window.__done = true;
</script>
</body></html>`;

// Write temp html file
fs.writeFileSync('C:/Users/AB/Desktop/royal_millenium/pdf-inline.html', html);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/AB/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

page.on('pageerror', e => console.log('ERR:', e.message));

await page.goto('http://localhost:3000/pdf-inline.html', { waitUntil: 'networkidle0', timeout: 30000 });
try {
  await page.waitForFunction('window.__done===true', { timeout: 60000 });
} catch(e) {
  const r = await page.evaluate(() => window.__rendered);
  console.log('timeout, rendered:', r);
}

const total = await page.evaluate(() => window.__total || 0);
console.log('Pages:', total);

for (let i = 1; i <= Math.min(total, 5); i++) {
  const el = await page.$(`#page-${i}`);
  if (el) {
    await el.screenshot({ path: `${dir}/pdf-rend-${i}.png` });
    console.log(`page ${i} saved`);
  }
}

await browser.close();
