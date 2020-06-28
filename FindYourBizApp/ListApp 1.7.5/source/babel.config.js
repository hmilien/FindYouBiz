module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-module-resolver', {
          alias: {
            'images': './assets/Images',
          }
        }
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-transform-runtime',
    ]
  };
};
