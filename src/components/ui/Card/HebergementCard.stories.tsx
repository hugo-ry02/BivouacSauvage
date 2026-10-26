import type { Meta, StoryObj } from '@storybook/react';
import { HebergementCard } from './HebergementCard';
import type { Hebergement } from '../../../types';

const sampleHebergement: Hebergement = {
  id: 'dome-canopee',
  slug: 'dome-canopee',
  nom: 'Dôme « La Canopée des Étoiles »',
  type: 'dome',
  typeLabel: 'Dôme Géodésique',
  accroche: 'Endormez-vous la tête sous la Voie Lactée dans un cocon géodésique transparent.',
  description: 'Niché sur un promontoire boisé orienté plein sud, ce dôme géodésique offre une vue panoramique à 180° sur la cime des hêtres.',
  capacite: 2,
  surface_m2: 28,
  hauteur_sol_m: 1.5,
  prix_par_nuit: 120,
  note: 4.9,
  nb_avis: 48,
  animaux_acceptes: false,
  equipements: [
    'Poêle à bois scandinave',
    'Terrasse panoramique en mélèze',
    'Télescope astronomique',
  ],
  eco_labels: ['solaire', 'poele'],
  image_principale: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
  images_secondaires: [],
  disponible: true,
};

const meta: Meta<typeof HebergementCard> = {
  title: 'Design System/HebergementCard',
  component: HebergementCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HebergementCard>;

export const Default: Story = {
  args: {
    hebergement: sampleHebergement,
    onSelect: (h) => alert(`Sélection de ${h.nom}`),
  },
};

export const WithAnimalsAllowed: Story = {
  args: {
    hebergement: {
      ...sampleHebergement,
      id: 'roulotte-sylvestre',
      nom: 'Roulotte Sylvestre Rétro',
      type: 'roulotte',
      typeLabel: 'Roulotte en Bois Massif',
      capacite: 3,
      animaux_acceptes: true,
      prix_par_nuit: 95,
      accroche: 'Atmosphère tzigane et terrain clos de 300m², parfait pour voyager avec son chien.',
    },
    onSelect: (h) => alert(`Sélection de ${h.nom}`),
  },
};

export const HighPerchedCabin: Story = {
  args: {
    hebergement: {
      ...sampleHebergement,
      id: 'cabane-trois-chenes',
      nom: 'Cabane des Trois Chênes',
      type: 'cabane',
      typeLabel: 'Cabane Perchée',
      capacite: 4,
      hauteur_sol_m: 7.0,
      prix_par_nuit: 165,
      eco_labels: ['bain_nordique', 'poele'],
      accroche: 'À 7 mètres du sol avec passerelle en bois et bain nordique privatif au feu de bois.',
    },
    onSelect: (h) => alert(`Sélection de ${h.nom}`),
  },
};
