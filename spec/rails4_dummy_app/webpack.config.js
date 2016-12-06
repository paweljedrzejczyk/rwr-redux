const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: ['./app/react/index.js'],
  },
  output: {
    path: `${__dirname}/app/assets/javascripts`,
    filename: 'react_bundle.js',
  },
  module: {
    loaders: [
      {
        key: 'js',
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
      {
        key: 'scss',
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass'),
      },
      {
        key: 'css',
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css!sass'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.js.jsx'],
    modulesDirectories: ['node_modules', path.resolve('./app/react')],
  },
  plugins: [
    new ExtractTextPlugin('../stylesheets/react_bundle.css', {
      allChunks: true,
    }),
  ],
};
