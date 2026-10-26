import React, { useState, useMemo } from 'react';
import type { Hebergement, FilterState, HebergementType, SortOption } from '../../types';
import { HebergementCard } from '../ui/Card/HebergementCard';
import { Button } from '../ui/Button/Button';
import { DetailModal } from '../ui/Modal/DetailModal';
import {
  Search,
  SlidersHorizontal,
  Dog,
  Users,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface ExplorerScreenProps {
  hebergements: Hebergement[];
  onSelectForBooking: (h: Hebergement) => void;
}

const INITIAL_FILTERS: FilterState = {
  type: 'all',
  minCapacite: 1,
  maxPrix: 200,
  animauxOnly: false,
  sortBy: 'prix-asc',
  searchQuery: '',
};

export const ExplorerScreen: React.FC<ExplorerScreenProps> = ({
  hebergements,
  onSelectForBooking,
}) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedHebergement, setSelectedHebergement] = useState<Hebergement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const typeOptions: { value: 'all' | HebergementType; label: string }[] = [
    { value: 'all', label: 'Tous les types' },
    { value: 'dome', label: 'Dômes géodésiques' },
    { value: 'cabane', label: 'Cabanes perchées' },
    { value: 'tente', label: 'Tentes safari' },
    { value: 'roulotte', label: 'Roulottes rétro' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'prix-asc', label: 'Prix : du moins cher au plus cher' },
    { value: 'prix-desc', label: 'Prix : du plus cher au moins cher' },
    { value: 'note-desc', label: 'Meilleures notes clients' },
    { value: 'capacite-asc', label: 'Capacité : croissante' },
  ];

  // Calcul dérivé et filtrage dynamique sans duplication d'état
  const filteredAndSortedHebergements = useMemo(() => {
    return hebergements
      .filter((item) => {
        // Filtre Type
        if (filters.type !== 'all' && item.type !== filters.type) return false;
        // Filtre Capacité
        if (item.capacite < filters.minCapacite) return false;
        // Filtre Animaux
        if (filters.animauxOnly && !item.animaux_acceptes) return false;
        // Recherche textuelle
        if (filters.searchQuery.trim() !== '') {
          const query = filters.searchQuery.toLowerCase();
          const matchesNom = item.nom.toLowerCase().includes(query);
          const matchesAccroche = item.accroche.toLowerCase().includes(query);
          const matchesDesc = item.description.toLowerCase().includes(query);
          const matchesEquip = item.equipements.some((eq) => eq.toLowerCase().includes(query));
          if (!matchesNom && !matchesAccroche && !matchesDesc && !matchesEquip) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'prix-asc') return a.prix_par_nuit - b.prix_par_nuit;
        if (filters.sortBy === 'prix-desc') return b.prix_par_nuit - a.prix_par_nuit;
        if (filters.sortBy === 'note-desc') return b.note - a.note;
        if (filters.sortBy === 'capacite-asc') return a.capacite - b.capacite;
        return 0;
      });
  }, [hebergements, filters]);

  const hasActiveFilters =
    filters.type !== 'all' ||
    filters.minCapacite > 1 ||
    filters.animauxOnly ||
    filters.searchQuery !== '' ||
    filters.sortBy !== 'prix-asc';

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleOpenDetail = (h: Hebergement) => {
    setSelectedHebergement(h);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* En-tête de la page */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-600 mb-2">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          Catalogue interactif
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-forest-950">
          Trouvez votre refuge sauvage idéal
        </h1>
        <p className="mt-2 text-sm sm:text-base text-text-muted">
          Filtrez par type d'architecture, capacité, accueil de votre animal ou équipements éco-responsables.
        </p>
      </div>

      {/* Barre d'outils et filtres interactifs */}
      <div className="rounded-2xl bg-surface-white border border-surface-border p-4 sm:p-6 shadow-xs mb-8 space-y-4">
        {/* Ligne 1 : Recherche textuelle + Tri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <label htmlFor="search-input" className="sr-only">
              Rechercher par mot-clé (étoiles, poêle, chêne...)
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-subtle">
              <Search className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="search-input"
              type="search"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Rechercher par mot-clé : étoiles, poêle à bois, chêne, terrasse..."
              className="w-full rounded-xl border border-surface-border bg-surface-ground pl-10 pr-4 py-2.5 text-sm text-text-main placeholder:text-text-subtle focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/20 min-h-[44px]"
            />
          </div>

          <div>
            <label htmlFor="sort-select" className="sr-only">
              Trier les résultats
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as SortOption })}
                className="w-full rounded-xl border border-surface-border bg-surface-ground px-3.5 py-2.5 text-sm font-medium text-text-main focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/20 min-h-[44px] cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Ligne 2 : Filtres combinables (Boutons Puces + Capacité + Switch Chien) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border">
          {/* Types d'hébergement sous forme de puces accessibles */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-text-subtle mr-1 hidden sm:inline">
              Type :
            </span>
            {typeOptions.map((opt) => {
              const isSelected = filters.type === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFilters({ ...filters, type: opt.value })}
                  aria-pressed={isSelected}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all min-h-[38px] cursor-pointer focus-visible:outline-2 focus-visible:outline-forest-700 ${
                    isSelected
                      ? 'bg-forest-700 text-surface-ground shadow-xs'
                      : 'bg-surface-ground text-text-main border border-surface-border hover:bg-forest-50'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filtre Capacité minimum */}
            <div className="flex items-center gap-2 bg-surface-ground px-3 py-1.5 rounded-xl border border-surface-border text-xs">
              <Users className="w-3.5 h-3.5 text-forest-700" aria-hidden="true" />
              <label htmlFor="capacity-select" className="font-medium text-text-muted">
                Voyageurs :
              </label>
              <select
                id="capacity-select"
                value={filters.minCapacite}
                onChange={(e) =>
                  setFilters({ ...filters, minCapacite: Number(e.target.value) })
                }
                className="bg-transparent font-bold text-text-main focus:outline-none cursor-pointer"
              >
                <option value={1}>1+ pers.</option>
                <option value={2}>2+ pers.</option>
                <option value={3}>3+ pers.</option>
                <option value={4}>4+ pers.</option>
                <option value={5}>5 pers.</option>
              </select>
            </div>

            {/* Filtre Animaux acceptés (Clé pour Corinne) */}
            <button
              type="button"
              onClick={() => setFilters({ ...filters, animauxOnly: !filters.animauxOnly })}
              aria-pressed={filters.animauxOnly}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all min-h-[38px] cursor-pointer focus-visible:outline-2 focus-visible:outline-forest-700 ${
                filters.animauxOnly
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-surface-ground border-surface-border text-text-muted hover:bg-amber-50/60'
              }`}
            >
              <Dog
                className={`w-3.5 h-3.5 ${
                  filters.animauxOnly ? 'text-amber-700' : 'text-text-subtle'
                }`}
                aria-hidden="true"
              />
              <span>Animaux acceptés</span>
            </button>

            {/* Bouton Réinitialiser si au moins un filtre actif */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />}
                className="text-xs text-text-muted hover:text-red-700"
              >
                Réinitialiser
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Compteur de résultats en direct */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-text-muted">
          <span className="font-extrabold text-forest-900">
            {filteredAndSortedHebergements.length}
          </span>{' '}
          hébergement{filteredAndSortedHebergements.length > 1 ? 's' : ''} disponible
          {filteredAndSortedHebergements.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille de cartes ou État Vide */}
      {filteredAndSortedHebergements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedHebergements.map((hebergement) => (
            <HebergementCard
              key={hebergement.id}
              hebergement={hebergement}
              onSelect={handleOpenDetail}
            />
          ))}
        </div>
      ) : (
        /* État vide soigné (Exigence formelle du PDF) */
        <div className="rounded-2xl border-2 border-dashed border-surface-border bg-surface-white p-12 text-center my-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700 mb-4">
            <SlidersHorizontal className="w-8 h-8 stroke-[1.75]" aria-hidden="true" />
          </div>
          <h2 className="font-display text-xl font-bold text-text-main">
            Aucun bivouac ne correspond à vos filtres actuels
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text-muted leading-relaxed">
            Essayez d'élargir votre recherche, de réduire la capacité minimale demandée ou de désactiver le filtre animalier pour découvrir nos autres hébergements.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              variant="primary"
              size="md"
              onClick={handleResetFilters}
              leftIcon={<RotateCcw className="w-4 h-4" aria-hidden="true" />}
            >
              Afficher tous les 12 hébergements
            </Button>
          </div>
        </div>
      )}

      {/* Modal de détail complet */}
      <DetailModal
        hebergement={selectedHebergement}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={(h) => {
          setIsModalOpen(false);
          onSelectForBooking(h);
        }}
      />
    </div>
  );
};
