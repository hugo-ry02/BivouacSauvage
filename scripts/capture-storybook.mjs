import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = path.resolve('docs/screenshots');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // Storybook overview / EcoBadge
  await page.goto('http://localhost:6009/?path=/story/design-system-ecobadge-sass-module--bain-nordique', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, 'storybook-ecobadge.png') });
  console.log('Saved storybook-ecobadge.png');

  // Storybook Button
  await page.goto('http://localhost:6009/?path=/story/design-system-button--accent', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, 'storybook-button.png') });
  console.log('Saved storybook-button.png');

  // Storybook Card
  await page.goto('http://localhost:6009/?path=/story/design-system-hebergementcard--with-animals-allowed', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, 'storybook-card.png') });
  console.log('Saved storybook-card.png');

  await browser.close();
}

run().catch(console.error);
