const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');
var OfflinePlugin = require('offline-plugin');

const VENDOR_LIBS = [
  'axios','bootstrap','es6-promise', 'lodash', 'fetch-jsonp', 'react-router-dom',
  'react', 'react-dom', 'react-geolocated','react-scroll-up-button','react-select'
];

module.exports = {
  // Everything flows from this file
  entry: {
    bundle: ['babel-polyfill', "./app/index.jsx"],
    vendor: VENDOR_LIBS
  },
  // Once Webpack is done, it assembles the file and deposits it
  // in the current directory in the build subdirectory, with a name of build.js
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        // Watch all files that end in .js
        test: /\.jsx?$/,
        // Unless it's in the node_modules directory
        exclude: /node_modules/,
        // And run it through the babel loader
        use: 'babel-loader'
      },
      {
        use:['style-loader','css-loader'],
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg|woff|woff2|eot|ttf)$/,
        use: [
          //'url-loader',
          {
            loader: 'url-loader',
            options: { limit: 100000 } //byte
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','manifest']
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new WebpackPwaManifest({
      name: 'SEPTA Realtime APP',
      short_name: 'Realtime',
      description: 'SEPTA Realtime APP',
      theme_color: '#2196F3',
      background_color: '#144B88',
      icons: [
      {
        src: "./images/SEPTA.png",
        sizes: '512x512'
      }
      ]
    }),
    new OfflinePlugin()
  ]
}