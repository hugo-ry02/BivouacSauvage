import React from 'react';
import type { ScreenName } from '../../types';
import { Tent, Heart, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenName) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-surface-border bg-forest-950 text-surface-ground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marque & Valeurs */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700 text-surface-ground">
                <Tent className="w-5 h-5 text-accent-400" aria-hidden="true" />
              </div>
              <span className="font-display text-lg font-extrabold text-surface-ground tracking-wide">
                BIVOUAC SAUVAGE
              </span>
            </div>
            <p className="text-sm text-forest-200 max-w-md leading-relaxed">
              Domaine d'éco-hébergements insolites au cœur du Parc Naturel Régional de la Montagne de Reims. Séjours 100% autonomes, poêles scandinaves et respect strict de la forêt.
            </p>
            <div className="flex items-center gap-2 text-xs text-accent-300">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Membre du réseau Écotourisme Grand Est</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-surface-ground mb-4">
              Explorer
            </h3>
            <ul className="space-y-2.5 text-sm text-forest-200">
              <li>
                <a
                  href="#accueil"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('accueil');
                  }}
                  className="hover:text-surface-ground transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 rounded-sm"
                >
                  Accueil & Démarche
                </a>
              </li>
              <li>
                <a
                  href="#explorer"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('explorer');
                  }}
                  className="hover:text-surface-ground transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 rounded-sm"
                >
                  Nos 12 Éco-hébergements
                </a>
              </li>
              <li>
                <a
                  href="#reservation"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('reservation');
                  }}
                  className="hover:text-surface-ground transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 rounded-sm"
                >
                  Réservation & Devis direct
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Accès */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-surface-ground mb-4">
              Contact & Accès
            </h3>
            <ul className="space-y-2.5 text-xs text-forest-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Domaine des Hêtres, Route de Louvois, 51380 Verzy</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-400 shrink-0" aria-hidden="true" />
                <span>bonjour@bivouac-sauvage.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-forest-800 text-xs text-forest-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Bivouac Sauvage — Projet noté ESGI Reims Bac+3 Web.</p>
          <p className="flex items-center gap-1">
            Conçu avec <Heart className="w-3.5 h-3.5 text-accent-500 fill-accent-500" aria-hidden="true" /> en React, Tailwind 4 & SASS
          </p>
        </div>
      </div>
    </footer>
  );
};
