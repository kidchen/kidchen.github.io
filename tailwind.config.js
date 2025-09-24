/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-ovo)', 'Georgia', 'serif'],
        'mono': ['var(--font-source-code-pro)', 'Monaco', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            fontFamily: 'var(--font-ovo), Georgia, serif',
            a: {
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#1d4ed8',
                textDecoration: 'underline',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              fontFamily: 'var(--font-source-code-pro), Monaco, Consolas, monospace',
              backgroundColor: '#f3f4f6',
              color: '#ec4899',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '400',
            },
            pre: {
              fontFamily: 'var(--font-source-code-pro), Monaco, Consolas, monospace',
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '4px',
              borderLeftColor: '#3b82f6',
              backgroundColor: '#eff6ff',
              padding: '1rem 1.5rem',
              margin: '1.5rem 0',
            },
            h1: {
              color: '#111827',
              fontWeight: '700',
            },
            h2: {
              color: '#111827',
              fontWeight: '700',
            },
            h3: {
              color: '#111827',
              fontWeight: '700',
            },
            h4: {
              color: '#111827',
              fontWeight: '700',
            },
            h5: {
              color: '#111827',
              fontWeight: '700',
            },
            h6: {
              color: '#111827',
              fontWeight: '700',
            },
            th: {
              backgroundColor: '#f9fafb',
              borderColor: '#d1d5db',
              color: '#111827',
            },
            td: {
              borderColor: '#d1d5db',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}