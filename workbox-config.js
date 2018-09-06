module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{json,ico,png,html,js,css}',
  ],
  swDest: 'build/sw.js',
  swSrc: 'public/sw.js',
};
