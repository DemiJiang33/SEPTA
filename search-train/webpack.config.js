var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Everything flows from this file
  entry: "./app/index.jsx",
  // Once Webpack is done, it assembles the file and deposits it
  // in the current directory in the build subdirectory, with a name of build.js
  output: {
    path: __dirname + "/build",
    publicPath: '/',
    filename: "build.js"
  },
  /*devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },*/
  module: {
    rules: [
      {
        // Watch all files that end in .js
        test: /\.jsx?$/,
        // Unless it's in the node_modules directory
        exclude: /node_modules/,
        // And run it through the babel loader
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './app/index.html'
  })]
}
