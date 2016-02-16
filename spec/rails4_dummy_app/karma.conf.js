var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha', 'sinon'],
    files: ['webpack/tests.config.js'],
    preprocessors: {
      'webpack/tests.config.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
          }]
      },
      watch: true,
      resolve: {
        extensions: ["", ".js", ".jsx", ".js.jsx"]
      },
      devtool: 'inline-source-map',
    },
    webpackServer: {
      noInfo: true
    }
  });

  if (process.env.TRAVIS)
    config.browsers = ['Chrome_travis_ci'];
};
