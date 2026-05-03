import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const pdfPath = path.join(__dirname, 'proj_assets', 'RM final .pdf');
const pdfUrl = `file:///${pdfPath.replace(/\\/g, '/')}`;

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/AB/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-web-security'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
await page.goto(pdfUrl, { waitUntil: 'networkidle2', timeout: 20000 });
await new Promise(r => setTimeout(r, 2000));

// Take multiple screenshots by scrolling
for (let i = 0; i < 6; i++) {
  const filepath = path.join(dir, `pdf-page-${i + 1}.png`);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`Saved pdf-page-${i + 1}.png`);
  await page.keyboard.press('PageDown');
  await new Promise(r => setTimeout(r, 1000));
}

await browser.close();
