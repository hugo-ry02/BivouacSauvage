import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Compass, ArrowRight, Trash2 } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Explorer les bivouacs',
    variant: 'primary',
    size: 'md',
  },
};

export const Accent: Story = {
  args: {
    children: 'Réserver ce bivouac',
    variant: 'accent',
    size: 'md',
    rightIcon: <ArrowRight className="w-4 h-4" />,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Filtrer les hébergements',
    variant: 'secondary',
    size: 'md',
    leftIcon: <Compass className="w-4 h-4" />,
  },
};

export const Ghost: Story = {
  args: {
    children: 'Réinitialiser',
    variant: 'ghost',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Annuler la réservation',
    variant: 'danger',
    size: 'md',
    leftIcon: <Trash2 className="w-4 h-4" />,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Créneau indisponible',
    variant: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Confirmation en cours',
    variant: 'primary',
    isLoading: true,
  },
};

export const LongContent: Story = {
  args: {
    children: 'Réserver immédiatement ce séjour insolite dôme panoramique avec bain nordique pour 2 personnes',
    variant: 'primary',
  },
};
