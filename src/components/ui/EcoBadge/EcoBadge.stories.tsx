import type { Meta, StoryObj } from '@storybook/react';
import { EcoBadge } from './EcoBadge';

const meta: Meta<typeof EcoBadge> = {
  title: 'Design System/EcoBadge (SASS Module)',
  component: EcoBadge,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['solaire', 'poele', 'bain_nordique', 'compost', 'zero_dechet'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    interactive: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof EcoBadge>;

export const Solaire: Story = {
  args: {
    category: 'solaire',
    size: 'md',
  },
};

export const PoeleABois: Story = {
  args: {
    category: 'poele',
    size: 'md',
  },
};

export const BainNordique: Story = {
  args: {
    category: 'bain_nordique',
    size: 'md',
  },
};

export const Compost: Story = {
  args: {
    category: 'compost',
    size: 'md',
  },
};

export const ZeroDechet: Story = {
  args: {
    category: 'zero_dechet',
    size: 'md',
  },
};

export const InteractiveSelected: Story = {
  args: {
    category: 'bain_nordique',
    size: 'md',
    interactive: true,
    selected: true,
    label: 'Filtre Bain Nordique actif',
  },
};

export const Small: Story = {
  args: {
    category: 'solaire',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    category: 'poele',
    size: 'lg',
  },
};

export const LongLabel: Story = {
  args: {
    category: 'zero_dechet',
    label: 'Démarche 100% zéro plastique et approvisionnement maraîcher certifié Bio',
    size: 'md',
  },
};
