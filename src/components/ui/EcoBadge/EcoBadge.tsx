import React from 'react';
import styles from './EcoBadge.module.scss';
import type { EcoCategory } from '../../../types';
import { Sun, Flame, Droplets, Leaf, Recycle } from 'lucide-react';

export interface EcoBadgeProps {
  category: EcoCategory;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const CATEGORY_CONFIG: Record<EcoCategory, { defaultLabel: string; icon: React.ReactNode }> = {
  solaire: {
    defaultLabel: '100% Solaire',
    icon: <Sun className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />,
  },
  poele: {
    defaultLabel: 'Poêle à bois',
    icon: <Flame className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />,
  },
  bain_nordique: {
    defaultLabel: 'Bain nordique',
    icon: <Droplets className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />,
  },
  compost: {
    defaultLabel: 'Sanitaires éco & compost',
    icon: <Leaf className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />,
  },
  zero_dechet: {
    defaultLabel: 'Zéro plastique',
    icon: <Recycle className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />,
  },
};

export const EcoBadge: React.FC<EcoBadgeProps> = ({
  category,
  label,
  size = 'md',
  interactive = false,
  selected = false,
  onClick,
  className = '',
}) => {
  const config = CATEGORY_CONFIG[category] || {
    defaultLabel: category,
    icon: <Leaf className="w-3.5 h-3.5" aria-hidden="true" />,
  };
  const displayLabel = label || config.defaultLabel;

  const classNames = [
    styles.badge,
    styles[`badge--${category}`],
    styles[`badge--${size}`],
    interactive ? styles['badge--interactive'] : '',
    selected ? styles['badge--selected'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (interactive) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={onClick}
        aria-pressed={selected}
        title={`Filtrer par : ${displayLabel}`}
      >
        <span className={styles.badge__dot} aria-hidden="true" />
        {config.icon}
        <span>{displayLabel}</span>
      </button>
    );
  }

  return (
    <span className={classNames}>
      <span className={styles.badge__dot} aria-hidden="true" />
      {config.icon}
      <span>{displayLabel}</span>
    </span>
  );
};
