import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Design System/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    isRequired: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Prénom et nom',
    placeholder: 'Ex: Julien Dupont',
    helperText: 'Indiquez le nom du responsable de la réservation.',
  },
};

export const Required: Story = {
  args: {
    label: 'Adresse e-mail',
    placeholder: 'julien@exemple.fr',
    type: 'email',
    isRequired: true,
    helperText: 'Votre bon de séjour et itinéraire vous seront envoyés par mail.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Numéro de téléphone',
    defaultValue: '06 12',
    isRequired: true,
    error: 'Veuillez saisir un numéro de téléphone valide à 10 chiffres.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Code parrainage',
    defaultValue: 'BIVOUAC2026',
    disabled: true,
    helperText: 'Ce code a déjà été appliqué automatiquement.',
  },
};

export const LongHelperText: Story = {
  args: {
    label: 'Besoins particuliers ou régimes alimentaires',
    placeholder: 'Précisez ici vos allergies ou questions sur l\'accessibilité...',
    helperText: 'Notre équipe locale prépare les paniers petits-déjeuners et organise votre accueil personnalisé selon vos indications.',
  },
};
