const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const reactPath = path.join(__dirname, 'app/react');
const indexFile = path.join(reactPath, 'index.js');
const outputPath = path.join(__dirname, 'app/assets/javascripts');

module.exports = {
  entry: {
    main: [indexFile],
  },
  output: {
    path: outputPath,
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
    modulesDirectories: ['node_modules', reactPath],
  },
  plugins: [
    new ExtractTextPlugin('../stylesheets/react_bundle.css', {
      allChunks: true,
    }),
  ],
};
