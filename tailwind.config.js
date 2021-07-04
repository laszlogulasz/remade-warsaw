module.exports = {
  theme: {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    extend: {
      colors: {
        primaryLight: 'rgba(255, 234, 229, 1)',
        primaryDark: 'rgba(92, 84, 83, 1)',
        secondaryLight: 'rgba(255, 244, 242, 1)',
        secondaryDark: 'rgba(143, 131, 129, 1)',
        deepDark: 'rgba(41, 37, 37, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
