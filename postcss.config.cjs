const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('postcss-purgecss');

const plugins = [
  tailwindcss,
  autoprefixer,
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    purgecss({
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      defaultExtractor: content => content.match(/[\w-/:.]+/g) || [],
      safelist: {
        standard: [/^html/, /^body/],
        deep: [/toast/, /modal/, /swiper/], // Esempi di classi da non rimuovere
      },
    })
  );
}

module.exports = {
  plugins,
};