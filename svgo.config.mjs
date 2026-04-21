/** @type {import('svgo').Config} */
export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          removeHiddenElems: false,
          removeViewBox: false,
        },
      },
    },
  ],
};
