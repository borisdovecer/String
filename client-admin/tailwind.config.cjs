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
    fontFamily: {
      sans: ['heming-variable'], // use here
      // serif: ['heming-variable', 'serif'], // and here if you want
    },
    extend: {
      colors: {
        light: {
          primary: '#ffffff',
          secondary: '#e2e2e2',
          tertiary: '#bdbdbd',
        },
        dark: {
          primary: '#282828',
          secondary: '#212121',
          tertiary: '#000000'
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