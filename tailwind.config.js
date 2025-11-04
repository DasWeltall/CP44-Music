import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ]
      },
      colors: {
        brand: '#00f5d4',
        accent: '#00bbf9',
        highlight: '#9b5de5'
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgba(203, 213, 225, 0.8)',
            '--tw-prose-headings': 'rgb(241, 245, 249)',
            '--tw-prose-links': '#00f5d4',
            '--tw-prose-bold': 'rgb(241, 245, 249)'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.range-slider': {
          '-webkit-appearance': 'none',
          'background-color': 'transparent',
          'cursor': 'pointer',
          '&::-webkit-slider-runnable-track': {
            'background-color': theme('colors.slate.700'),
            'border-radius': theme('borderRadius.full'),
            'height': theme('height.2')
          },
          '&::-webkit-slider-thumb': {
            '-webkit-appearance': 'none',
            'background-color': theme('colors.brand'),
            'border-radius': theme('borderRadius.full'),
            'height': theme('height.4'),
            'width': theme('width.4'),
            'margin-top': '-4px'
          }
        }
      });
    })
  ]
} satisfies Config;
