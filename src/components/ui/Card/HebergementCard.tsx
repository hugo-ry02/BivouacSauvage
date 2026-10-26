import React from 'react';
import type { Hebergement } from '../../../types';
import { EcoBadge } from '../EcoBadge/EcoBadge';
import { Button } from '../Button/Button';
import { Users, Star, ArrowRight, Dog, Trees } from 'lucide-react';

export interface HebergementCardProps {
  hebergement: Hebergement;
  onSelect: (hebergement: Hebergement) => void;
  className?: string;
}

export const HebergementCard: React.FC<HebergementCardProps> = ({
  hebergement,
  onSelect,
  className = '',
}) => {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl bg-surface-white border border-surface-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${className}`.trim()}
    >
      {/* Image avec ratio fixe et badges superposés */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-forest-100">
        <img
          src={hebergement.image_principale}
          alt={`Photographie de l'éco-hébergement ${hebergement.nom} en pleine forêt`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width="600"
          height="375"
          loading="lazy"
          decoding="async"
        />

        {/* Badge catégorie en haut à gauche */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-forest-900/85 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-surface-ground">
            <Trees className="w-3.5 h-3.5 text-accent-400" aria-hidden="true" />
            {hebergement.typeLabel}
          </span>
          {hebergement.animaux_acceptes && (
            <span
              className="inline-flex items-center gap-1 rounded-full bg-amber-900/80 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-amber-100"
              title="Animaux de compagnie acceptés"
            >
              <Dog className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              Animaux bienvenus
            </span>
          )}
        </div>

        {/* Note d'avis en haut à droite */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-surface-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-text-main shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" aria-hidden="true" />
          <span>{hebergement.note.toFixed(2)}</span>
          <span className="text-text-muted font-normal">({hebergement.nb_avis})</span>
        </div>
      </div>

      {/* Contenu textuel */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold text-text-main line-clamp-1 group-hover:text-forest-700 transition-colors">
            {hebergement.nom}
          </h3>

          <p className="mt-1.5 text-sm text-text-muted line-clamp-2">
            {hebergement.accroche}
          </p>

          {/* Caractéristiques rapides */}
          <div className="mt-3.5 flex flex-wrap items-center gap-3 text-xs text-text-muted font-medium border-y border-surface-border py-2.5">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-forest-600" aria-hidden="true" />
              <span>Jusqu'à {hebergement.capacite} pers.</span>
            </span>
            <span aria-hidden="true">•</span>
            <span>{hebergement.surface_m2} m²</span>
            <span aria-hidden="true">•</span>
            <span>
              {hebergement.hauteur_sol_m > 1
                ? `Perché à ${hebergement.hauteur_sol_m}m`
                : 'De plain-pied'}
            </span>
          </div>

          {/* Éco-Badges SASS */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hebergement.eco_labels.slice(0, 2).map((label) => (
              <EcoBadge key={label} category={label} size="sm" />
            ))}
          </div>
        </div>

        {/* Pied de carte avec prix et CTA explicite */}
        <div className="mt-5 flex items-center justify-between pt-3 border-t border-surface-border/60">
          <div>
            <div className="text-xs text-text-muted">À partir de</div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-extrabold text-forest-800">
                {hebergement.prix_par_nuit} €
              </span>
              <span className="text-xs text-text-muted">/ nuit</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onSelect(hebergement)}
            rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
            aria-label={`Découvrir et réserver ${hebergement.nom}`}
          >
            Découvrir
          </Button>
        </div>
      </div>
    </article>
  );
};
