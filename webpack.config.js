var webpack = require('webpack');
var path = require('path');
var ejs = require('ejs');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: './src/js/app.js',

  include: [
    path.resolve(__dirname, "./src/tags")
  ],

  output: {
    filename: 'webpack-app.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/, 
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]') }
    ]
  },

  // options for resolution of imports
  resolve: {
    modulesDirectories: ['node_modules', 'tags']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};