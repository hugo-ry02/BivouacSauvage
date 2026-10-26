import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('docs/screenshots');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const URL = 'https://bivouac-sauvage.vercel.app/';

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
  });

  // ====== 1. DESKTOP CAPTURES ======
  const pageD = await browser.newPage();
  await pageD.setViewport({ width: 1280, height: 900 });
  await pageD.goto(URL, { waitUntil: 'networkidle2' });

  // D1: Accueil
  await pageD.screenshot({ path: path.join(OUT_DIR, 'desktop-accueil.png') });
  console.log('Saved desktop-accueil.png');

  // D2: Explorer
  await pageD.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Explorer les bivouacs') || b.textContent?.includes('Explorer nos 12 bivouacs'));
    btn?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await pageD.screenshot({ path: path.join(OUT_DIR, 'desktop-explorer.png') });
  console.log('Saved desktop-explorer.png');

  // D3: État vide
  await pageD.type('#search-input', 'introuvablexyz123');
  await new Promise(r => setTimeout(r, 400));
  await pageD.screenshot({ path: path.join(OUT_DIR, 'desktop-etat-vide.png') });
  console.log('Saved desktop-etat-vide.png');

  // Reset filter
  await pageD.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Afficher tous les 12 hébergements'));
    btn?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // D4: Detail Modal
  await pageD.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Découvrir'));
    btn?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const modalEl = await pageD.$('[role="dialog"] .bg-surface-white');
  if (modalEl) {
    await modalEl.screenshot({ path: path.join(OUT_DIR, 'desktop-modal-detail.png') });
  } else {
    await pageD.screenshot({ path: path.join(OUT_DIR, 'desktop-modal-detail.png') });
  }
  console.log('Saved desktop-modal-detail.png');

  // D5: Reservation
  await pageD.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Réserver ce bivouac'));
    btn?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await pageD.setViewport({ width: 1280, height: 1250 });
  await new Promise(r => setTimeout(r, 300));
  await pageD.screenshot({ path: path.join(OUT_DIR, 'desktop-reservation.png') });
  console.log('Saved desktop-reservation.png');

  // D6: Confirmation
  await pageD.type('#prenom', 'Julien');
  await pageD.type('#nom', 'Dupont');
  await pageD.type('#email', 'julien.dupont@test.fr');
  await pageD.type('#telephone', '0612345678');
  await pageD.evaluate(() => {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn?.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await pageD.setViewport({ width: 1280, height: 1050 });
  await new Promise(r => setTimeout(r, 300));
  await pageD.screenshot({ path: path.join(OUT_DIR, 'desktop-confirmation.png') });
  console.log('Saved desktop-confirmation.png');

  // ====== 2. MOBILE CAPTURES (375px) ======
  const pageM = await browser.newPage();
  await pageM.setViewport({ width: 375, height: 812 });
  await pageM.goto(URL, { waitUntil: 'networkidle2' });

  // M1: Accueil
  await pageM.screenshot({ path: path.join(OUT_DIR, 'mobile-accueil.png') });
  console.log('Saved mobile-accueil.png');

  // M2: Explorer
  await pageM.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Explorer'));
    btn?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await pageM.screenshot({ path: path.join(OUT_DIR, 'mobile-explorer.png') });
  console.log('Saved mobile-explorer.png');

  // M3: Reservation
  await pageM.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Découvrir'));
    btn?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await pageM.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Réserver ce bivouac'));
    btn?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await pageM.screenshot({ path: path.join(OUT_DIR, 'mobile-reservation.png') });
  console.log('Saved mobile-reservation.png');

  // M4: Confirmation
  await pageM.type('#prenom', 'Corinne');
  await pageM.type('#nom', 'Martin');
  await pageM.type('#email', 'corinne.martin@test.fr');
  await pageM.type('#telephone', '0687654321');
  await pageM.evaluate(() => {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn?.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await pageM.screenshot({ path: path.join(OUT_DIR, 'mobile-confirmation.png') });
  console.log('Saved mobile-confirmation.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(console.error);
