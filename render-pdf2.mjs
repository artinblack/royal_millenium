import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/AB/Desktop/royal_millenium/temporary screenshots';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/AB/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });
await page.goto('http://localhost:3000/pdf-viewer.html', { waitUntil: 'networkidle0', timeout: 30000 });

try {
  await page.waitForFunction('window.__done === true', { timeout: 25000 });
} catch(e) {
  console.log('timeout waiting for render');
}

const numPages = await page.evaluate(() => window.__totalPages || 0);
console.log('Total pages:', numPages);

for (let i = 1; i <= numPages; i++) {
  const el = await page.$(`#page-${i}`);
  if (el) {
    const outPath = path.join(dir, `pdf-p${i}.png`);
    await el.screenshot({ path: outPath });
    console.log(`Saved pdf-p${i}.png`);
  }
}

await browser.close();
