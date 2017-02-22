'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/components', to: 'components' },
      { from: 'src/index.html' },
      { from: 'src/style.css' }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: [ 'es2015' ] }
      }
    ]
  },
};
