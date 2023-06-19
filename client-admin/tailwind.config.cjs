module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        light: {
          primary: '#ffffff',
          secondary: '#f2f2f2',
          tertiary: '#e0e0e0',
          quaternary: '#d0d0d0',
        },
        dark: {
          primary: '#000000',
          secondary: '#333333',
          tertiary: '#666666',
          quaternary: '#999999',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
      textColor: ['dark', 'dark-hover', 'dark-active'],
    },
  },
  plugins: [],
}