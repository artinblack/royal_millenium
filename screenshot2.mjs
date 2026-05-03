import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const scrollY = parseInt(process.argv[4] || '0');

const existing = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
const next = nums.length ? Math.max(...nums) + 1 : 1;
const filename = `screenshot-${next}${label}.png`;
const filepath = path.join(dir, filename);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/AB/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
await page.evaluate(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')));
if (scrollY > 0) await page.evaluate((y) => window.scrollTo(0, y), scrollY);
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: filepath, fullPage: false });
await browser.close();
console.log(`Saved: temporary screenshots/${filename}`);
