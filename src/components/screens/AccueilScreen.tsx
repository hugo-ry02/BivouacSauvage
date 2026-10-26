import React from 'react';
import type { Hebergement, ScreenName } from '../../types';
import { Button } from '../ui/Button/Button';
import { HebergementCard } from '../ui/Card/HebergementCard';
import {
  Compass,
  Trees,
  Flame,
  Sun,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Clock,
  HeartHandshake,
} from 'lucide-react';

interface AccueilScreenProps {
  hebergements: Hebergement[];
  onNavigate: (screen: ScreenName) => void;
  onSelectHebergement: (h: Hebergement) => void;
}

export const AccueilScreen: React.FC<AccueilScreenProps> = ({
  hebergements,
  onNavigate,
  onSelectHebergement,
}) => {
  const coupDeCoeurList = hebergements.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* Hero Section Immersif */}
      <section className="relative overflow-hidden rounded-3xl bg-forest-950 text-surface-ground mx-4 sm:mx-6 lg:mx-8 mt-6">
        {/* Image de fond avec filtre sombre pour contraste WCAG AAA */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1920&q=80"
            alt="Vue panoramique de la forêt de la Montagne de Reims au crépuscule"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 py-16 sm:px-12 sm:py-24 lg:py-28">
          {/* Badge de réassurance (Test des 5 secondes) */}
          <div className="inline-flex items-center gap-2 rounded-full bg-forest-800/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-accent-300 border border-forest-600/40 mb-6">
            <Sparkles className="w-4 h-4 text-accent-400" aria-hidden="true" />
            <span>Éco-Domaine Préservé de 15 Hectares à Verzy</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-ground leading-[1.15]">
            Reconnectez-vous au vivant dans nos hébergements insolites.
          </h1>

          <p className="mt-5 text-base sm:text-xl text-forest-100 max-w-2xl font-normal leading-relaxed">
            Dômes géodésiques ouverts sur la Voie Lactée, cabanes suspendues à 7 mètres et roulottes rétro au cœur du Parc Naturel de la Montagne de Reims.
          </p>

          {/* Appel à l'action UNIQUE et principal */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              variant="accent"
              size="lg"
              onClick={() => onNavigate('explorer')}
              rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
              className="text-base px-8 py-4 shadow-lg shadow-accent-600/20"
            >
              Explorer nos 12 bivouacs
            </Button>

            <div className="flex items-center gap-3 px-2 text-xs sm:text-sm text-forest-200">
              <Clock className="w-4 h-4 text-accent-300 shrink-0" aria-hidden="true" />
              <span>Réservation instantanée sans intermédiaire</span>
            </div>
          </div>

          {/* 3 Preuves de confiance immédiates (5-second test) */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-forest-800/80">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-accent-400 shrink-0" aria-hidden="true" />
              <div className="text-xs">
                <div className="font-bold text-surface-ground">100% Autonome</div>
                <div className="text-forest-200">Énergie solaire & bois</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" aria-hidden="true" />
              <div className="text-xs">
                <div className="font-bold text-surface-ground">4.9 / 5 étoiles</div>
                <div className="text-forest-200">Plus de 350 séjours réussis</div>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <div className="text-xs">
                <div className="font-bold text-surface-ground">Zéro Béton</div>
                <div className="text-forest-200">Structures réversibles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 Piliers Éco-conçus */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest-950">
            Une aventure sauvage sans concession sur le confort
          </h2>
          <p className="mt-3 text-text-muted text-sm sm:text-base">
            Chaque hébergement est implanté selon les clairières naturelles pour préserver la faune locale et vous offrir un calme absolu.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-surface-white border border-surface-border p-6 shadow-xs flex flex-col">
            <div className="h-12 w-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-700 mb-4">
              <Trees className="w-6 h-6 stroke-[2]" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-text-main">
              Intégration Sylvestre
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Nos cabanes sont suspendues sans aucun clou dans les troncs des chênes. Respect des cycles biologiques de la forêt marnaise.
            </p>
          </div>

          <div className="rounded-2xl bg-surface-white border border-surface-border p-6 shadow-xs flex flex-col">
            <div className="h-12 w-12 rounded-xl bg-accent-100 flex items-center justify-center text-accent-700 mb-4">
              <Flame className="w-6 h-6 stroke-[2]" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-text-main">
              Chaleur Scandinave & Bains Nordiques
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Poêles en fonte, duvets en duvet naturel d'Auvergne et bains d'eau de source chauffés au feu de bois sous les constellations.
            </p>
          </div>

          <div className="rounded-2xl bg-surface-white border border-surface-border p-6 shadow-xs flex flex-col">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
              <HeartHandshake className="w-6 h-6 stroke-[2]" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-text-main">
              Circuit Court Rémois
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Paniers de terroir 100% bio issus des maraîchers et boulangers de Verzy et de la Montagne de Reims. Zéro plastique à usage unique.
            </p>
          </div>
        </div>
      </section>

      {/* Sélection Coups de Cœur */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-accent-600 uppercase tracking-wider">
              Sélection du moment
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest-950 mt-1">
              Les hébergements préférés de nos voyageurs
            </h2>
          </div>

          <Button
            variant="secondary"
            onClick={() => onNavigate('explorer')}
            rightIcon={<Compass className="w-4 h-4" aria-hidden="true" />}
          >
            Voir tous les 12 hébergements
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupDeCoeurList.map((hebergement) => (
            <HebergementCard
              key={hebergement.id}
              hebergement={hebergement}
              onSelect={onSelectHebergement}
            />
          ))}
        </div>
      </section>

      {/* Témoignages Utilisateurs (Grounding nos personas) */}
      <section className="bg-forest-900 text-surface-ground py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-surface-ground">
              Ce que nos aventuriers en disent
            </h2>
            <p className="mt-2 text-forest-200 text-sm">
              Expériences vécues par nos hôtes en quête d'air pur et de déconnexion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <blockquote className="rounded-2xl bg-forest-800/70 border border-forest-700/60 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3" aria-label="Note : 5 sur 5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-forest-100 italic leading-relaxed">
                  « Réservé en 2 minutes dans le train un vendredi soir. Le dôme géodésique sous les étoiles avec le poêle qui crépite était exactement ce dont nous avions besoin pour couper avec le rythme parisien. »
                </p>
              </div>
              <footer className="mt-4 pt-4 border-t border-forest-700/50 flex items-center justify-between text-xs text-forest-300">
                <span className="font-semibold text-surface-ground">Julien D. — Séjour en couple</span>
                <span>Dôme La Canopée</span>
              </footer>
            </blockquote>

            <blockquote className="rounded-2xl bg-forest-800/70 border border-forest-700/60 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3" aria-label="Note : 5 sur 5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-forest-100 italic leading-relaxed">
                  « La Roulotte Sylvestre était parfaite pour mes petits-enfants et notre chien ! Le jardin clos apporte une vraie sérénité, l'accès est de plain-pied et le confort était au rendez-vous. »
                </p>
              </div>
              <footer className="mt-4 pt-4 border-t border-forest-700/50 flex items-center justify-between text-xs text-forest-300">
                <span className="font-semibold text-surface-ground">Corinne M. — Famille & Chien</span>
                <span>Roulotte Sylvestre</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};
