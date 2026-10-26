import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'bivouac-ground',
      values: [
        { name: 'bivouac-ground', value: '#F9F8F5' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'forest-dark', value: '#1F3A2D' },
      ],
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
