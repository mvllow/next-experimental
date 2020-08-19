const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./{components,pages}/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      borderColor: {
        default: '#eaeaea',
      },
      colors: {
        primary: '#0070f3',
        'primary-light': '#00dfd8',
        gray: {
          100: '#fafafa',
          200: '#eaeaea',
          500: '#666',
        },
      },
    },
  },
}
