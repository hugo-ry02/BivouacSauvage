import React, { useEffect } from 'react';
import type { Hebergement } from '../../../types';
import { EcoBadge } from '../EcoBadge/EcoBadge';
import { Button } from '../Button/Button';
import {
  X,
  Users,
  Maximize2,
  TreePine,
  Dog,
  CheckCircle2,
  Star,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface DetailModalProps {
  hebergement: Hebergement | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (hebergement: Hebergement) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  hebergement,
  isOpen,
  onClose,
  onBook,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !hebergement) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop sombre avec fermeture au clic */}
      <div
        className="fixed inset-0 bg-forest-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Conteneur de modal responsive */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-surface-white border border-surface-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* En-tête avec bouton de fermeture accessible */}
        <div className="flex items-center justify-between border-b border-surface-border px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-forest-100 px-2.5 py-1 text-xs font-bold text-forest-800">
              {hebergement.typeLabel}
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" aria-hidden="true" />
              <span className="font-semibold text-text-main">{hebergement.note}</span>
              <span>({hebergement.nb_avis} avis)</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fiche détaillée"
            className="flex items-center justify-center rounded-lg p-2 text-text-muted hover:bg-forest-50 hover:text-text-main focus-visible:outline-2 focus-visible:outline-forest-700 min-h-[44px] min-w-[44px]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Corps défilable */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Galerie d'images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 aspect-16/10 rounded-xl overflow-hidden bg-forest-100">
              <img
                src={hebergement.image_principale}
                alt={`Photographie principale de ${hebergement.nom}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col gap-3">
              {hebergement.images_secondaires.map((img, i) => (
                <div key={i} className="aspect-16/10 rounded-xl overflow-hidden bg-forest-100 flex-1">
                  <img
                    src={img}
                    alt={`Vue supplémentaire ${i + 1} de ${hebergement.nom}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 id="modal-title" className="font-display text-2xl font-bold text-text-main">
              {hebergement.nom}
            </h2>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              {hebergement.description}
            </p>
          </div>

          {/* Caractéristiques techniques */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-forest-50/70 p-4 border border-forest-100">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-forest-700" aria-hidden="true" />
              <div>
                <div className="text-xs text-text-muted">Capacité</div>
                <div className="text-sm font-bold text-text-main">
                  {hebergement.capacite} personnes
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Maximize2 className="w-5 h-5 text-forest-700" aria-hidden="true" />
              <div>
                <div className="text-xs text-text-muted">Superficie</div>
                <div className="text-sm font-bold text-text-main">
                  {hebergement.surface_m2} m²
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <TreePine className="w-5 h-5 text-forest-700" aria-hidden="true" />
              <div>
                <div className="text-xs text-text-muted">Élévation</div>
                <div className="text-sm font-bold text-text-main">
                  {hebergement.hauteur_sol_m > 0
                    ? `${hebergement.hauteur_sol_m}m du sol`
                    : 'Plain-pied'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Dog className="w-5 h-5 text-forest-700" aria-hidden="true" />
              <div>
                <div className="text-xs text-text-muted">Animaux</div>
                <div className="text-sm font-bold text-text-main">
                  {hebergement.animaux_acceptes ? 'Acceptés' : 'Non admis'}
                </div>
              </div>
            </div>
          </div>

          {/* Éco-Labels SASS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-subtle mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent-600" aria-hidden="true" />
              Engagements Éco-conçus
            </h3>
            <div className="flex flex-wrap gap-2">
              {hebergement.eco_labels.map((category) => (
                <EcoBadge key={category} category={category} size="md" />
              ))}
            </div>
          </div>

          {/* Équipements inclus */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-subtle mb-3">
              Équipements & Services Inclus
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-main">
              {hebergement.equipements.map((eq, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" aria-hidden="true" />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pied de modal avec tarif et CTA de réservation */}
        <div className="flex items-center justify-between border-t border-surface-border bg-surface-ground px-6 py-4">
          <div>
            <span className="text-xs text-text-muted">Tarif séjour</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-forest-900">
                {hebergement.prix_par_nuit} €
              </span>
              <span className="text-xs text-text-muted">/ nuit</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onClose}>
              Fermer
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                onClose();
                onBook(hebergement);
              }}
              rightIcon={<Calendar className="w-4 h-4" aria-hidden="true" />}
            >
              Réserver ce bivouac
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
