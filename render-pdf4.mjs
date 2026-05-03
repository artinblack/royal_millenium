import puppeteer from 'puppeteer';
import fs from 'fs';

const dir = 'C:/Users/AB/Desktop/royal_millenium/temporary screenshots';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/AB/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe',
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
page.on('console', m => { if (m.type() !== 'warning') console.log('LOG:', m.text()); });
page.on('pageerror', e => console.log('ERR:', e.message));

await page.setViewport({ width: 1300, height: 900 });

// Simple HTML that fetches pdf via URL
const html = `<!DOCTYPE html><html><body style="background:#333;margin:0">
<canvas id="c"></canvas>
<script type="module">
import * as pdfjs from '/node_modules/pdfjs-dist/build/pdf.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.mjs';
try {
  const resp = await fetch('/proj_assets/RM final .pdf');
  const buf = await resp.arrayBuffer();
  const pdf = await pdfjs.getDocument({data: new Uint8Array(buf)}).promise;
  window.__total = pdf.numPages;
  console.log('pages:' + pdf.numPages);

  for(let i=1; i<=Math.min(pdf.numPages,8); i++){
    const p = await pdf.getPage(i);
    const vp = p.getViewport({scale:1.4});
    const c = document.createElement('canvas');
    c.id='p'+i; c.width=vp.width; c.height=vp.height;
    c.style.display='block'; c.style.marginBottom='8px';
    document.body.appendChild(c);
    await p.render({canvasContext:c.getContext('2d'),viewport:vp}).promise;
    window.__done = i;
    console.log('rendered:'+i);
  }
  window.__finished = true;
} catch(e){ console.log('fatal:'+e.message); window.__error=e.message; }
</script></body></html>`;

await page.setContent(html, { waitUntil: 'domcontentloaded' });
// Set base URL so fetch works
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
await page.setContent(html);

// poll for completion
let rendered = 0;
for (let attempt = 0; attempt < 120; attempt++) {
  await new Promise(r => setTimeout(r, 1000));
  const state = await page.evaluate(() => ({
    finished: window.__finished,
    done: window.__done,
    error: window.__error
  }));
  if (state.finished || state.error) {
    console.log('State:', JSON.stringify(state));
    rendered = state.done || 0;
    break;
  }
  if (attempt % 10 === 0) console.log('waiting... rendered so far:', state.done);
}

const total = await page.evaluate(() => window.__total || 0);
console.log('Total pages:', total, 'rendered:', rendered);

for (let i = 1; i <= rendered; i++) {
  const el = await page.$(`#p${i}`);
  if (el) {
    await el.screenshot({ path: `${dir}/pdf-rend-${i}.png` });
    console.log(`Saved page ${i}`);
  }
}

await browser.close();
