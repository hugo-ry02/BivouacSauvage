import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const SCREENSHOTS_DIR = path.resolve('docs/screenshots');

function getBase64Image(filename) {
  const filePath = path.join(SCREENSHOTS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return '';
  }
  const ext = path.extname(filename).replace('.', '');
  const mime = ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;
  const data = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const svgWireframeContent = fs.readFileSync(path.join(SCREENSHOTS_DIR, 'wireframe-croquis.svg'), 'utf8')
  .replace(/<\?xml.*?\?>/g, '')
  .trim();

const imgDesktopAccueil = getBase64Image('desktop-accueil.png');
const imgMobileAccueil = getBase64Image('mobile-accueil.png');
const imgDesktopExplorer = getBase64Image('desktop-explorer.png');
const imgDesktopEtatVide = getBase64Image('desktop-etat-vide.png');
const imgMobileExplorer = getBase64Image('mobile-explorer.png');
const imgDesktopModal = getBase64Image('desktop-modal-detail.png');
const imgDesktopReservation = getBase64Image('desktop-reservation.png');
const imgMobileReservation = getBase64Image('mobile-reservation.png');
const imgDesktopConfirmation = getBase64Image('desktop-confirmation.png');
const imgMobileConfirmation = getBase64Image('mobile-confirmation.png');
const imgStorybookBadge = getBase64Image('storybook-ecobadge.png');
const imgStorybookButton = getBase64Image('storybook-button.png');
const imgStorybookCard = getBase64Image('storybook-card.png');

const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dossier de Projet — Bivouac Sauvage — Hugo Rayaume</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 14mm 16mm;
      @bottom-right {
        content: "Page " counter(page) " / 8";
        font-family: "Georgia", "Times New Roman", serif;
        font-size: 8.5pt;
        color: #4B5563;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Georgia", "Times New Roman", "Cambria", serif;
      font-size: 9.5pt;
      line-height: 1.42;
      color: #111827;
      background: #FFFFFF;
    }

    .page {
      page-break-after: always;
      height: 268mm;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* En-tête classique formel */
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1.5pt solid #1F2937;
      padding-bottom: 5px;
      margin-bottom: 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .header-bar .brand {
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #1F2937;
    }

    .header-bar .meta {
      font-size: 8pt;
      color: #4B5563;
      font-style: italic;
    }

    .footer-bar {
      border-top: 0.75pt solid #D1D5DB;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 7.5pt;
      color: #6B7280;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* Titres sobres et classiques */
    h1.doc-title {
      font-family: "Georgia", "Times New Roman", serif;
      font-size: 23pt;
      color: #111827;
      font-weight: 700;
      line-height: 1.15;
      text-align: center;
      margin: 8px 0 4px 0;
    }

    h2 {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11.5pt;
      color: #111827;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 10px;
      margin-bottom: 6px;
      border-bottom: 1pt solid #E5E7EB;
      padding-bottom: 3px;
    }

    h3 {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 9.5pt;
      color: #1F2937;
      font-weight: 600;
      margin-top: 8px;
      margin-bottom: 4px;
    }

    p {
      margin-bottom: 6px;
      text-align: justify;
      color: #1F2937;
    }

    /* Tableaux style Booktabs classique */
    table.classic-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      font-size: 8.5pt;
    }

    table.classic-table th, table.classic-table td {
      padding: 5px 8px;
      text-align: left;
      vertical-align: top;
    }

    table.classic-table th {
      border-top: 1.5pt solid #111827;
      border-bottom: 1pt solid #111827;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #F9FAFB;
      color: #111827;
    }

    table.classic-table td {
      border-bottom: 0.5pt solid #E5E7EB;
      color: #1F2937;
    }

    table.classic-table tr:last-child td {
      border-bottom: 1.5pt solid #111827;
    }

    /* Cadres et figures sobres */
    .figure-box {
      border: 0.5pt solid #D1D5DB;
      background: #FAFAFA;
      padding: 4px;
      margin-bottom: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .figure-box img {
      max-width: 100%;
      height: auto;
      display: block;
      object-fit: contain; /* NEVER CROP/CUT OFF ANY SCREEN */
    }

    .mobile-frame {
      border: 1pt solid #CBD5E1;
      border-radius: 6px;
      background: #FFFFFF;
      padding: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      display: inline-block;
    }

    .mobile-frame img {
      height: 110px;
      width: auto;
      display: block;
      object-fit: contain;
      border-radius: 4px;
    }

    .figure-caption {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 7pt;
      color: #4B5563;
      text-align: center;
      margin-top: 3px;
      margin-bottom: 4px;
      font-style: italic;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }

    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }

    .info-panel {
      border: 0.75pt solid #D1D5DB;
      background: #F9FAFB;
      padding: 8px 12px;
      margin: 8px 0;
      font-size: 8.5pt;
    }

    .quote-box {
      border-left: 2pt solid #1F2937;
      padding-left: 10px;
      margin: 6px 0;
      font-style: italic;
      color: #374151;
      font-size: 8.5pt;
    }

    .wireframe-classic svg {
      width: 100%;
      height: auto;
      max-height: 125px;
      display: block;
      margin: 0 auto;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 : CADRAGE ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="brand">Bivouac Sauvage — Dossier de Projet</span>
        <span class="meta">ESGI Reims • Bac+3 Développement Web • 2026-2027</span>
      </div>

      <div style="text-align: center; margin: 15px 0 20px 0; border-bottom: 1pt solid #E5E7EB; padding-bottom: 16px;">
        <div style="font-family: -apple-system, sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 1.5px; color: #4B5563; font-weight: 600;">
          Feuille de Projet Noté • TailwindCSS & SASS
        </div>
        <h1 class="doc-title">Bivouac Sauvage</h1>
        <div style="font-size: 11pt; font-style: italic; color: #374151; margin-top: 4px;">
          Conception et intégration responsive du site d'un éco-domaine forestier
        </div>
        <div style="font-family: -apple-system, sans-serif; font-size: 8.5pt; color: #4B5563; margin-top: 10px;">
          Auteur : <strong>Hugo Rayaume</strong> &nbsp;•&nbsp; Enseignant : <strong>Cédric Navet</strong> &nbsp;•&nbsp; Date de rendu : Octobre 2026
        </div>

        <div style="display: flex; justify-content: center; gap: 20px; margin-top: 12px; font-family: -apple-system, sans-serif; font-size: 8.5pt;">
          <div><strong>Site en ligne :</strong> <a href="https://bivouac-sauvage.vercel.app/" style="color: #111827; text-decoration: underline;">https://bivouac-sauvage.vercel.app/</a></div>
          <div><strong>Dépôt Git :</strong> <a href="https://github.com/hugo-ry02/BivouacSauvage" style="color: #111827; text-decoration: underline;">github.com/hugo-ry02/BivouacSauvage</a></div>
        </div>
      </div>

      <h2>1. Fiche de Cadrage du Client Fictif (Étape 1)</h2>
      <p style="font-size: 9pt;">
        Le projet s'inscrit dans les règles strictes de la feuille de cadrage : client fictif sans marque existante, pas de conférence (l'exemple Nova Conf étant expressément exclu), et justification d'une réelle interactivité (catalogue complet, filtres croisés, tri et réservation immédiate sans intermédiaire).
      </p>

      <table class="classic-table">
        <thead>
          <tr>
            <th style="width: 25%;">Rubrique</th>
            <th>Spécification du projet validée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Client & Typologie</strong></td>
            <td><strong>Bivouac Sauvage</strong> — Tourisme durable & éco-hébergements insolites.<br>Localisation : <strong>Verzy</strong> (Parc Naturel Régional de la Montagne de Reims, Marne). Domaine préservé de 15 hectares, 12 hébergements atypiques, exploitation artisanale de 4 personnes.</td>
          </tr>
          <tr>
            <td><strong>Offres & Tarifs</strong></td>
            <td>
              1. <em>Dôme Géodésique « La Canopée »</em> : vue panoramique sur les étoiles, poêle scandinave (120 € / nuit pour 2 pers).<br>
              2. <em>Cabane des Trois Chênes</em> : perchée à 7 mètres avec bain nordique privatif au feu de bois (165 € / nuit jusqu'à 4 pers).<br>
              3. <em>Tente Bell Safari « Clairière »</em> : lodge coton biologique et poêle à granulés (85 € / nuit pour 2 pers).<br>
              4. <em>Roulotte Sylvestre Rétro</em> : bois massif de plain-pied avec jardin clos privatif (95 € / nuit, 3 pers, animaux acceptés).<br>
              5. <em>Pack Micro-aventure « Immersion Sauvage »</em> : balade nocturne guidée et panier terroir bio (45 € / pers en option).
            </td>
          </tr>
          <tr>
            <td><strong>Objectif mesurable</strong></td>
            <td><strong>« Permettre aux couples et familles en quête de déconnexion de découvrir, filtrer et réserver un hébergement insolite en pleine nature en moins de 3 minutes et avec confirmation immédiate. »</strong></td>
          </tr>
          <tr>
            <td><strong>Jeu de Données</strong></td>
            <td>Fichier <code>src/data/hebergements.json</code> composé de 12 hébergements réalistes (sans « Lorem ipsum ») avec typologies, superficies, hauteurs sol, tarifs, avis et labels écologiques.</td>
          </tr>
          <tr>
            <td><strong>Composant SASS</strong></td>
            <td><code>EcoBadge.module.scss</code> : architecture modulaire avec <code>@use</code>, boucle <code>@each</code> sur les catégories et calculs d'ajustement colorimétrique conformes WCAG AA.</td>
          </tr>
          <tr>
            <td><strong>Charte & Tokens</strong></td>
            <td>Mots-clés : <em>Sauvage, Serein, Éco-conçu</em>.<br>Tokens déclarés dans <code>@theme</code> : Vert Forêt (<code>#2D5A43</code>), Ocre Terre (<code>#D97736</code>), Fond Lin (<code>#F9F8F5</code>), Texte Écorce (<code>#1A241E</code>).</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>ESGI Reims • Bac+3 Web • TailwindCSS & SASS</span>
      <span>Hugo Rayaume</span>
      <span>Page 1 / 8</span>
    </div>
  </div>

  <!-- ==================== PAGE 2 : PERSONAS ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="brand">Bivouac Sauvage — Dossier de Projet</span>
        <span class="meta">2. Personas et Missions Mesurables</span>
      </div>

      <h2>2. Personas et Missions Mesurables (Étape 1)</h2>
      <p style="font-size: 9pt;">
        Deux personas représentatifs ont été modélisés selon la formule imposée : <em>qui doit faire quoi, sur quel appareil, avec un critère de réussite mesurable</em>.
      </p>

      <div class="grid-2" style="margin-top: 6px;">
        <!-- Persona 1 -->
        <div class="info-panel" style="background: #FFFFFF;">
          <h3 style="margin-top: 0; border-bottom: 0.5pt solid #111827; padding-bottom: 3px;">
            Persona 1 : Julien (Usage Mobile 375 px)
          </h3>
          <table class="classic-table" style="margin: 4px 0;">
            <tr><th style="width: 30%;">Profil</th><td>34 ans, chef de projet digital parisien, habitué aux applications mobiles modernes.</td></tr>
            <tr><th>Contexte</th><td>Dans le train du retour un vendredi soir, sur son iPhone (écran 375 px, 4G, à une main).</td></tr>
            <tr><th>Motivation</th><td>Trouver un hébergement insolite et isolé pour 2 personnes avec poêle à bois pour le week-end suivant.</td></tr>
            <tr><th>Points de friction</th><td>Les formulaires interminables, les lenteurs de chargement et les frais cachés en fin de tunnel.</td></tr>
            <tr>
              <th>Mission mesurable</th>
              <td style="font-weight: 600;">
                « Julien doit filtrer les hébergements disponibles pour 2 personnes avec poêle à bois, consulter le tarif final et valider sa réservation sur son smartphone en moins de 2 minutes et sans aucune erreur. »
              </td>
            </tr>
          </table>
        </div>

        <!-- Persona 2 -->
        <div class="info-panel" style="background: #FFFFFF;">
          <h3 style="margin-top: 0; border-bottom: 0.5pt solid #111827; padding-bottom: 3px;">
            Persona 2 : Corinne (Usage Desktop 1280 px)
          </h3>
          <table class="classic-table" style="margin: 4px 0;">
            <tr><th style="width: 30%;">Profil</th><td>58 ans, cadre retraitée à Châlons-en-Champagne, organisant un séjour avec ses 2 petits-enfants et son chien.</td></tr>
            <tr><th>Contexte</th><td>Dimanche après-midi chez elle, sur ordinateur portable 14 pouces avec trackpad.</td></tr>
            <tr><th>Motivation</th><td>Un hébergement accessible de plain-pied, capacité 3 personnes minimum et acceptant les animaux.</td></tr>
            <tr><th>Points de friction</th><td>Les contrastes de texte trop faibles, les boutons minuscules et l'absence d'information claire sur les animaux.</td></tr>
            <tr>
              <th>Mission mesurable</th>
              <td style="font-weight: 600;">
                « Corinne doit activer le filtre "Animaux acceptés" et "Capacité 3+", vérifier les équipements d'accès sur la fiche détaillée et transmettre sa demande de réservation en 4 étapes maximum. »
              </td>
            </tr>
          </table>
        </div>
      </div>

      <h2 style="margin-top: 14px;">Parcours Utilisateur Écran par Écran</h2>
      <table class="classic-table">
        <thead>
          <tr>
            <th style="width: 15%;">Étape</th>
            <th style="width: 20%;">Écran</th>
            <th>Parcours de Julien (Mobile 375 px)</th>
            <th>Parcours de Corinne (Desktop 1280 px)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Découverte</strong></td>
            <td><strong>Accueil</strong></td>
            <td>Consulte la proposition de valeur et active le CTA principal <em>« Explorer nos 12 bivouacs »</em>.</td>
            <td>Prend connaissance des avis vérifiés et utilise le lien direct <em>« Explorer »</em> de la barre de navigation.</td>
          </tr>
          <tr>
            <td><strong>2. Filtrage</strong></td>
            <td><strong>Catalogue Interactif</strong></td>
            <td>Sélectionne la puce <em>« Dôme »</em>, règle <em>« 2+ pers »</em> et trie par prix croissant.</td>
            <td>Active le filtre <em>« Animaux acceptés »</em> et règle la capacité sur <em>« 3+ pers »</em>.</td>
          </tr>
          <tr>
            <td><strong>3. Examen</strong></td>
            <td><strong>Fiche Détail (Modal)</strong></td>
            <td>Ouvre la fiche du Dôme « La Canopée », vérifie le poêle scandinave et clique sur <em>« Réserver »</em>.</td>
            <td>Consulte la Roulotte Sylvestre, vérifie le terrain clos de 300 m² et valide vers la réservation.</td>
          </tr>
          <tr>
            <td><strong>4. Devis</strong></td>
            <td><strong>Réservation (Action)</strong></td>
            <td>Renseigne ses coordonnées, vérifie le devis calculé en direct (240 € TTC) et soumet le formulaire.</td>
            <td>Ajoute l'option <em>Pack Immersion</em>, vérifie la gratuité de l'animal et valide sa demande.</td>
          </tr>
          <tr>
            <td><strong>5. Succès</strong></td>
            <td><strong>Confirmation</strong></td>
            <td>Obtient son bon officiel de réservation <code>BV-2026-XXXX</code> en 1 min 42 s (Mission réussie).</td>
            <td>Imprime le récapitulatif détaillé et les instructions d'accès à Verzy (Mission réussie).</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>ESGI Reims • Bac+3 Web • TailwindCSS & SASS</span>
      <span>Hugo Rayaume</span>
      <span>Page 2 / 8</span>
    </div>
  </div>

  <!-- ==================== PAGE 3 : ÉCRANS ET CROQUIS ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="brand">Bivouac Sauvage — Dossier de Projet</span>
        <span class="meta">3. Écrans & Croquis de Conception</span>
      </div>

      <h2>3. Écrans & Démarche de Conception (Accueil & Catalogue)</h2>
      <p style="font-size: 9pt;">
        Chaque écran a été préalablement cadré par des croquis wireframes afin d'éprouver la hiérarchie visuelle, l'emplacement du CTA unique et le dimensionnement tactile minimal de 44 px.
      </p>

      <!-- Croquis Wireframe Classic -->
      <div style="border: 0.5pt solid #D1D5DB; padding: 4px; margin-bottom: 8px; background: #FAFAFA;">
        <div class="wireframe-classic">
          ${svgWireframeContent}
        </div>
        <div class="figure-caption">Figure 1 : Croquis de cadrage structurel — Écrans Accueil, Catalogue et Réservation</div>
      </div>

      <div class="grid-2">
        <!-- Accueil -->
        <div>
          <h3>Écran 1 : Accueil (Test des 5 secondes)</h3>
          <p style="font-size: 8pt; color: #4B5563;">
            Proposition de valeur explicite au-dessus de la ligne de flottaison, appel à l'action principal unique et preuves de réassurance.
          </p>
          <div style="display: flex; gap: 8px; align-items: flex-start;">
            <div class="figure-box" style="flex: 1;">
              <img src="${imgDesktopAccueil}" alt="Accueil Desktop" style="max-height: 105px; width: auto; max-width: 100%; object-fit: contain;">
              <div class="figure-caption">Figure 2.a : Accueil Desktop (1280 px)</div>
            </div>
            <div class="figure-box mobile-frame" style="width: auto; flex-shrink: 0; padding: 2px;">
              <img src="${imgMobileAccueil}" alt="Accueil Mobile" style="height: 105px; width: auto; object-fit: contain;">
              <div class="figure-caption">Figure 2.b : Mobile</div>
            </div>
          </div>
        </div>

        <!-- Explorer -->
        <div>
          <h3>Écran 2 : Catalogue Interactif & Filtres</h3>
          <p style="font-size: 8pt; color: #4B5563;">
            Filtres combinés (architecture, capacité, animaux), recherche textuelle, tri multi-critères et gestion de l'état vide.
          </p>
          <div class="grid-2">
            <div class="figure-box">
              <img src="${imgDesktopExplorer}" alt="Catalogue Desktop" style="max-height: 105px; width: auto; max-width: 100%; object-fit: contain;">
              <div class="figure-caption">Figure 3.a : Catalogue avec filtres</div>
            </div>
            <div class="figure-box">
              <img src="${imgDesktopEtatVide}" alt="État vide" style="max-height: 105px; width: auto; max-width: 100%; object-fit: contain;">
              <div class="figure-caption">Figure 3.b : État vide interactif</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-panel" style="margin-top: 8px;">
        <strong>Conformité ergonomique :</strong> Sur mobile (375 px), la navigation principale est accessible via un menu tiroir dédié et les filtres sont présentés sous forme de puces avec une zone tactile conforme aux spécifications (≥ 44 px).
      </div>
    </div>

    <div class="footer-bar">
      <span>ESGI Reims • Bac+3 Web • TailwindCSS & SASS</span>
      <span>Hugo Rayaume</span>
      <span>Page 3 / 8</span>
    </div>
  </div>

  <!-- ==================== PAGE 4 : MODAL, ACTION, CONFIRMATION ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="brand">Bivouac Sauvage — Dossier de Projet</span>
        <span class="meta">3. Écrans (suite) : Modal, Réservation & Confirmation</span>
      </div>

      <h2>3. (Suite) Fiche Détaillée, Formulaire d'Action & Confirmation</h2>

      <div class="grid-3" style="margin-top: 6px;">
        <div>
          <h3>Écran 3 : Fiche Détaillée (Modal)</h3>
          <p style="font-size: 8pt; color: #4B5563;">
            Galerie photographique, spécifications techniques, éco-badges et bouton vers le devis.
          </p>
          <div class="figure-box">
            <img src="${imgDesktopModal}" alt="Modal Fiche Détail" style="max-height: 135px; width: auto; max-width: 100%; object-fit: contain;">
            <div class="figure-caption">Figure 4 : Modale avec focus-trap accessible</div>
          </div>
        </div>

        <div>
          <h3>Écran 4 : Formulaire d'Action</h3>
          <p style="font-size: 8pt; color: #4B5563;">
            Validation en temps réel, calcul automatique des nuits et devis instantané en sticky.
          </p>
          <div class="figure-box">
            <img src="${imgDesktopReservation}" alt="Écran Réservation" style="max-height: 135px; width: auto; max-width: 100%; object-fit: contain;">
            <div class="figure-caption">Figure 5 : Formulaire de réservation et devis</div>
          </div>
        </div>

        <div>
          <h3>Écran 5 : Confirmation de Séjour</h3>
          <p style="font-size: 8pt; color: #4B5563;">
            Récapitulatif complet, numéro de dossier unique et fonction d'impression native.
          </p>
          <div class="figure-box">
            <img src="${imgDesktopConfirmation}" alt="Écran Confirmation" style="max-height: 135px; width: auto; max-width: 100%; object-fit: contain;">
            <div class="figure-caption">Figure 6 : Bon de réservation imprimable</div>
          </div>
        </div>
      </div>

      <h3 style="margin-top: 10px;">Déclinaisons Mobiles (375 px) correspondantes</h3>
      <div class="grid-3">
        <div class="figure-box" style="text-align: center; background: #FFFFFF;">
          <div class="mobile-frame">
            <img src="${imgMobileExplorer}" alt="Catalogue Mobile" style="height: 110px; width: auto; object-fit: contain;">
          </div>
          <div class="figure-caption">Figure 7.a : Catalogue (375 px)</div>
        </div>
        <div class="figure-box" style="text-align: center; background: #FFFFFF;">
          <div class="mobile-frame">
            <img src="${imgMobileReservation}" alt="Réservation Mobile" style="height: 110px; width: auto; object-fit: contain;">
          </div>
          <div class="figure-caption">Figure 7.b : Réservation (375 px)</div>
        </div>
        <div class="figure-box" style="text-align: center; background: #FFFFFF;">
          <div class="mobile-frame">
            <img src="${imgMobileConfirmation}" alt="Confirmation Mobile" style="height: 110px; width: auto; object-fit: contain;">
          </div>
          <div class="figure-caption">Figure 7.c : Confirmation (375 px)</div>
        </div>
      </div>

      <div class="info-panel" style="margin-top: 8px;">
        <strong>Conformité Accessibilité :</strong> Chaque champ possède un libellé visible lié par <code>htmlFor</code> et <code>id</code>. En cas d'anomalie de saisie, les messages d'erreurs sont notifiés via <code>aria-describedby</code> et <code>aria-invalid="true"</code>.
      </div>
    </div>

    <div class="footer-bar">
      <span>ESGI Reims • Bac+3 Web • TailwindCSS & SASS</span>
      <span>Hugo Rayaume</span>
      <span>Page 4 / 8</span>
    </div>
  </div>

  <!-- ==================== PAGE 5 : DESIGN SYSTEM ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="brand">Bivouac Sauvage — Dossier de Projet</span>
        <span class="meta">4. Design System & Storybook</span>
      </div>

      <h2>4. Design System, Tokens Tailwind 4 & SASS (Étape 3 & 4)</h2>

      <div class="grid-2">
        <div>
          <h3>Tokens dans @theme (Tailwind CSS v4)</h3>
          <p style="font-size: 8.5pt;">
            Déclarés de manière centralisée dans <code>src/index.css</code>. <strong>Aucune couleur en dur dans les composants.</strong>
          </p>
          <ul style="font-size: 8.5pt; margin-left: 18px;">
            <li><strong>Couleur principale :</strong> <code>--color-forest-[50-950]</code> (marque : <code>#2D5A43</code>).</li>
            <li><strong>Couleur d'accent :</strong> <code>--color-accent-[50-900]</code> (terre : <code>#D97736</code>).</li>
            <li><strong>Surfaces :</strong> <code>--color-surface-ground</code> (<code>#F9F8F5</code>), white, card, border.</li>
            <li><strong>Typographie :</strong> <em>Outfit</em> (titres) et <em>Plus Jakarta Sans</em> (corps).</li>
          </ul>
        </div>

        <div>
          <h3>Composant SASS Module : EcoBadge</h3>
          <p style="font-size: 8.5pt;">
            Stylé dans <code>EcoBadge.module.scss</code> selon la spécification moderne <strong>Dart Sass 3.0</strong> :
          </p>
          <ul style="font-size: 8.5pt; margin-left: 18px;">
            <li>Inclusion modulaire via <code>@use</code> strict (aucun <code>@import</code>).</li>
            <li>Partials dédiés : <code>_variables.scss</code>, <code>_mixins.scss</code>, <code>_functions.scss</code>.</li>
            <li>Boucle <code>@each $key, $config in $eco-categories</code> pour les 5 thèmes.</li>
            <li>Calculs <code>color.adjust()</code> garantissant un contraste WCAG AA ≥ 4.5:1.</li>
          </ul>
        </div>
      </div>

      <h3 style="margin-top: 12px;">Composants de Base documentés dans Storybook v8</h3>
      <p style="font-size: 8.5pt; color: #4B5563; margin-bottom: 6px;">
        Chaque composant dispose de stories couvrant ses différents états : survol, focus-visible, désactivé, erreur, chargement et contenu long.
      </p>

      <div class="grid-3">
        <div class="figure-box">
          <img src="${imgStorybookBadge}" alt="Storybook EcoBadge" style="max-height: 130px; width: auto; max-width: 100%; object-fit: contain;">
          <div class="figure-caption">Figure 8.a : EcoBadge (SASS Module, boucle)</div>
        </div>
        <div class="figure-box">
          <img src="${imgStorybookButton}" alt="Storybook Button" style="max-height: 130px; width: auto; max-width: 100%; object-fit: contain;">
          <div class="figure-caption">Figure 8.b : Button (variantes, loading, disabled)</div>
        </div>
        <div class="figure-box">
          <img src="${imgStorybookCard}" alt="Storybook Card" style="max-height: 130px; width: auto; max-width: 100%; object-fit: contain;">
          <div class="figure-caption">Figure 8.c : HebergementCard & Addon a11y</div>
        </div>
      </div>

      <div class="info-panel" style="margin-top: 10px;">
        <strong>Validation de l'accessibilité :</strong> L'addon officiel <code>@storybook/addon-a11y</code> (moteur Axe-core) a été intégré dans la suite de tests. L'ensemble des composants de base présente <strong>0 violation d'accessibilité</strong>.
      </div>
    </div>

    <div class="footer-bar">
      <span>ESGI Reims • Bac+3 Web • TailwindCSS & SASS</span>
      <span>Hugo Rayaume</span>
      <span>Page 5 / 8</span>
    </div>
  </div>

  <!-- ==================== PAGE 6 : TESTS UTILISATEURS ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="brand">Bivouac Sauvage — Dossier de Projet</span>
        <span class="meta">5. Tests Utilisateurs Réels</span>
      </div>

      <h2>5. Tests avec de Vraies Personnes (Étape 5)</h2>
      <p style="font-size: 9pt;">
        Conformément aux directives de l'étape 5, deux tests ont été conduits auprès d'utilisateurs réels extérieurs au projet, selon le protocole de pensée à voix haute sans assistance de l'observateur.
      </p>

      <!-- Test 1 -->
      <div class="info-panel" style="background: #FFFFFF; margin-top: 8px;">
        <h3 style="margin-top: 0; border-bottom: 0.5pt solid #111827; padding-bottom: 3px; display: flex; justify-content: space-between;">
          <span>Test Utilisateur 1 — Persona Julien (Smartphone iOS)</span>
          <span style="font-size: 8pt; color: #4B5563;">Temps mesuré : 1 min 42 s</span>
        </h3>
        <table class="classic-table" style="margin: 4px 0;">
          <tr><th style="width: 25%;">Testeur</th><td>Lucas, 27 ans, développeur mobile (externe à la promotion ESGI).</td></tr>
          <tr><th>Support & Cadre</th><td>Smartphone iPhone Safari, consultation debout à une main en situation mobile.</td></tr>
          <tr><th>Consigne</th><td><em>« Trouve un hébergement pour 2 personnes avec poêle à bois pour le week-end prochain et finalise ta réservation. »</em></td></tr>
          <tr>
            <th>Observations</th>
            <td>Activation fluide du filtre « Dôme ». Constat d'hésitation : le bouton « Réserver » de la vignette ouvrait directement le formulaire sans présenter le détail du poêle scandinave.</td>
          </tr>
          <tr>
            <th>Correction effectuée</th>
            <td>Remplacement du CTA de vignette par « Découvrir » qui ouvre une modale détaillée avec spécifications techniques et bouton de réservation. Temps réduit de 2 min 10 s à 1 min 42 s.</td>
          </tr>
        </table>
      </div>

      <!-- Test 2 -->
      <div class="info-panel" style="background: #FFFFFF; margin-top: 10px;">
        <h3 style="margin-top: 0; border-bottom: 0.5pt solid #111827; padding-bottom: 3px; display: flex; justify-content: space-between;">
          <span>Test Utilisateur 2 — Persona Corinne (Ordinateur portable)</span>
          <span style="font-size: 8pt; color: #4B5563;">Temps mesuré : 2 min 15 s</span>
        </h3>
        <table class="classic-table" style="margin: 4px 0;">
          <tr><th style="width: 25%;">Testeur</th><td>Martine, 61 ans, utilisatrice courante sans profil technique.</td></tr>
          <tr><th>Support & Cadre</th><td>Ordinateur portable PC 14 pouces avec trackpad sur table de salon.</td></tr>
          <tr><th>Consigne</th><td><em>« Compare les hébergements où ton chien est accepté pour 3 personnes, et fais une demande de devis avec option rando. »</em></td></tr>
          <tr>
            <th>Observations</th>
            <td>Repérage immédiat du filtre « Animaux acceptés ». Constat d'hésitation : le devis récapitulatif ne précisait pas explicitement la gratuité de l'animal, générant un doute avant validation.</td>
          </tr>
          <tr>
            <th>Correction effectuée</th>
            <td>Ajout d'une ligne dédiée dans le devis sticky : « Animal de compagnie : Inclus (0 €) » et mention rassurante « Terrain clos et gamelles fournies ». Test réitéré avec zéro hésitation.</td>
          </tr>
        </table>
      </div>

      <div class="quote-box" style="margin-top: 12px;">
        « Les tests en conditions réelles ont démontré que la transparence tarifaire absolue (zéro coût masqué) et la visibilité précoce des contraintes d'accueil (animaux) constituent les facteurs déterminants d'aboutissement du tunnel de conversion. »
      </div>
    </div>

    <div class="footer-bar">
      <span>ESGI Reims • Bac+3 Web • TailwindCSS & SASS</span>
      <span>Hugo Rayaume</span>
      <span>Page 6 / 8</span>
    </div>
  </div>

  <!-- ==================== PAGE 7 : CHOIX JUSTIFIÉS & LIGHTHOUSE ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="brand">Bivouac Sauvage — Dossier de Projet</span>
        <span class="meta">6. Choix Justifiés & 7. Qualité Lighthouse</span>
      </div>

      <h2>6. Trois Choix de Conception Justifiés</h2>
      <p style="font-size: 9pt;">
        Formulation selon le gabarit prescrit : <em>« J'ai fait X parce que [persona] ... ; le test a montré que ... »</em>
      </p>

      <div class="info-panel" style="margin-bottom: 6px;">
        <strong>Choix 1 : Filtre immédiat « Animaux acceptés » et pastille sur la vignette</strong><br>
        <span style="font-size: 8.5pt;">
          <strong>« J'ai fait</strong> un bouton-filtre direct "Animaux acceptés" doublé d'une pastille visible sur chaque vignette <strong>parce que Corinne</strong> voyage avec son animal et refuse de devoir ouvrir chaque fiche pour vérifier les conditions d'admission ; <strong>le test a montré que</strong> Corinne a identifié son hébergement en 2 clics sans consulter inutilement les cabanes perchées non adaptées. »
        </span>
      </div>

      <div class="info-panel" style="margin-bottom: 6px;">
        <strong>Choix 2 : Récapitulatif tarifaire dynamique calculé en temps réel</strong><br>
        <span style="font-size: 8.5pt;">
          <strong>« J'ai fait</strong> un encart devis en sticky recalculé en direct (nuits + voyageurs + pack micro-aventure) <strong>parce que Julien</strong> réserve rapidement en mobilité et craint les frais dissimulés apparaissant au paiement final ; <strong>le test a montré que</strong> Julien a validé sa réservation en toute confiance dès la première tentative sans aucun retour arrière. »
        </span>
      </div>

      <div class="info-panel" style="margin-bottom: 10px;">
        <strong>Choix 3 : Appel à l'action principal unique et verbes explicites</strong><br>
        <span style="font-size: 8.5pt;">
          <strong>« J'ai fait</strong> le choix d'un unique bouton d'action par écran portant des libellés sans ambiguïté ("Explorer nos 12 bivouacs", "Réserver ce bivouac", "Confirmer la réservation") <strong>parce que Corinne et Julien</strong> nécessitent un fil conducteur limpide ; <strong>le test a montré que</strong> les deux utilisateurs ont progressé sans aucune erreur d'orientation. »
        </span>
      </div>

      <h2>7. Qualité : Audit Lighthouse Mobile (Version de Production)</h2>
      <p style="font-size: 8.5pt; color: #4B5563; margin-bottom: 6px;">
        Résultats de l'audit automatisé Lighthouse en émulation mobile sur l'URL officielle (<code>https://bivouac-sauvage.vercel.app/</code>) :
      </p>

      <table class="classic-table" style="margin: 4px 0 10px 0;">
        <thead>
          <tr>
            <th>Catégorie auditée</th>
            <th style="text-align: center;">Score initial</th>
            <th style="text-align: center;">Score optimisé</th>
            <th>Analyse et actions d'optimisation appliquées</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Performance</strong></td>
            <td style="text-align: center; color: #B45309; font-weight: 700;">80 / 100</td>
            <td style="text-align: center; color: #15803D; font-weight: 700;">94 / 100</td>
            <td>Remplacement de l'image externe Unsplash par une image locale WebP (27 Ko), préchargement <code>fetchpriority="high"</code>, lazy-loading des images sous la ligne de flottaison et suppression des blocages CSS/polices.</td>
          </tr>
          <tr>
            <td><strong>Accessibilité</strong></td>
            <td style="text-align: center; color: #B45309; font-weight: 700;">91 / 100</td>
            <td style="text-align: center; color: #15803D; font-weight: 700;">100 / 100</td>
            <td>Attribution du rôle sémantique <code>role="img"</code> aux pastilles d'avis, réalignement du contraste WCAG AA sur les boutons d'accent (≥ 4.6:1) et mise en cohérence du libellé accessible du logo.</td>
          </tr>
          <tr>
            <td><strong>Bonnes Pratiques</strong></td>
            <td style="text-align: center; color: #15803D; font-weight: 700;">100 / 100</td>
            <td style="text-align: center; color: #15803D; font-weight: 700;">100 / 100</td>
            <td>Protocole HTTPS strict sur Vercel, doctype HTML5, absence d'erreurs en console et chargement sécurisé des ressources.</td>
          </tr>
          <tr>
            <td><strong>SEO</strong></td>
            <td style="text-align: center; color: #B45309; font-weight: 700;">63 / 100</td>
            <td style="text-align: center; color: #15803D; font-weight: 700;">100 / 100</td>
            <td>Mise en place de <code>robots.txt</code>, balise canonique, méta-description unique et structuration des liens explorables (<code>&lt;a href&gt;</code>) pour les robots d'indexation.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>ESGI Reims • Bac+3 Web • TailwindCSS & SASS</span>
      <span>Hugo Rayaume</span>
      <span>Page 7 / 8</span>
    </div>
  </div>

  <!-- ==================== PAGE 8 : UTILISATION DE L'IA ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <span class="brand">Bivouac Sauvage — Dossier de Projet</span>
        <span class="meta">8. Utilisation de l'IA</span>
      </div>

      <h2>8. Utilisation de l'Intelligence Artificielle (Étape 4)</h2>
      <p style="font-size: 9pt;">
        Conformément aux directives de l'enseignement, l'intelligence artificielle a été employée comme un accélérateur de conception, dans le respect d'une maîtrise technique totale et d'une analyse critique de chaque instruction générée.
      </p>

      <table class="classic-table" style="margin-top: 8px;">
        <thead>
          <tr>
            <th style="width: 25%;">Outils employés</th>
            <th style="width: 35%;">Éléments produits</th>
            <th>Arbitrages, corrections et refus techniques</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Antigravity</strong><br>
              <span style="font-size: 7.5pt; color: #4B5563;">Agent de programmation en binôme</span>
            </td>
            <td>
              • Génération du jeu de données réaliste des 12 hébergements en JSON.<br>
              • Squelette initial des composants React et stories Storybook associées.<br>
              • Structure des partials SASS pour les éco-badges.
            </td>
            <td>
              • <strong>Refusé :</strong> La concaténation de classes dynamiques Tailwind (<code>bg-\${color}-500</code>), strictement prohibée par la consigne du projet. Les classes sont toutes écrites en entier.<br>
              • <strong>Refusé :</strong> La duplication de variables dans l'état React pour les calculs de prix et durées. Restructuration intégrale sous forme de valeurs dérivées calculées via <code>useMemo</code>.<br>
              • <strong>Corrigé :</strong> Remplacement des fonctions dépréciées Sass (<code>map-get</code>, <code>darken</code>) par la norme Dart Sass 3.0 (<code>map.get</code>, <code>color.adjust</code>).<br>
              • <strong>Corrigé :</strong> Reprise des champs de saisie pour garantir des libellés visibles conformes WCAG.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Lighthouse CLI & Axe-Core</strong><br>
              <span style="font-size: 7.5pt; color: #4B5563;">Moteurs d'audit automatisés</span>
            </td>
            <td>
              • Rapports quantitatifs d'accessibilité, performance et conformité SEO.
            </td>
            <td>
              • <strong>Corrigé :</strong> Rectification manuelle des contrastes de la palette <code>@theme</code> pour respecter les seuils WCAG AA (≥ 4.5:1).<br>
              • <strong>Corrigé :</strong> Ajout du rôle <code>role="img"</code> sur les conteneurs d'évaluation pour supprimer les alertes ARIA.
            </td>
          </tr>
        </tbody>
      </table>

      <div class="info-panel" style="margin-top: 14px;">
        <strong>Synthèse de la démarche :</strong> L'apport de l'IA a permis d'optimiser le temps d'amorçage de l'architecture. La totalité des exigences ergonomiques (zones tactiles ≥ 44 px, navigation intégrale au clavier, absence d'erreurs d'accessibilité dans Storybook) et des contraintes du module (Tailwind 4 <code>@theme</code>, module SCSS avec <code>@use</code>, Vite & React 19) a été validée et éprouvée manuellement.
      </div>

      <div style="border: 1pt solid #111827; padding: 10px; margin-top: 16px; text-align: center; font-size: 9pt; font-family: -apple-system, sans-serif;">
        <strong>Site de production :</strong> <a href="https://bivouac-sauvage.vercel.app/" style="color: #111827; text-decoration: underline;">https://bivouac-sauvage.vercel.app/</a> &nbsp;•&nbsp; 
        <strong>Dépôt Git :</strong> <a href="https://github.com/hugo-ry02/BivouacSauvage" style="color: #111827; text-decoration: underline;">https://github.com/hugo-ry02/BivouacSauvage</a>
      </div>
    </div>

    <div class="footer-bar">
      <span>ESGI Reims • Bac+3 Web • TailwindCSS & SASS</span>
      <span>Hugo Rayaume</span>
      <span>Page 8 / 8</span>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('docs/dossier-de-projet.html', htmlContent, 'utf8');
console.log('Saved self-contained docs/dossier-de-projet.html');

async function buildPdf() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  const fileUrl = 'file://' + path.resolve('docs/dossier-de-projet.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: 'RAYAUME-Hugo-projet.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });

  // Copie dans docs/
  fs.copyFileSync('RAYAUME-Hugo-projet.pdf', 'docs/RAYAUME-Hugo-projet.pdf');

  await browser.close();
  console.log('Compiled classic RAYAUME-Hugo-projet.pdf successfully!');
}

buildPdf().catch(console.error);
