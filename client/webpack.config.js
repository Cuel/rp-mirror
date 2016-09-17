const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    'angular2': './src/angular2',
    'vendor': './src/vendor',
    'app': './src/main',
    'styles': './src/styles'
  },
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['to-string', 'css'],
        include: path.resolve(__dirname, 'src', 'app')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader'),
        exclude: path.resolve(__dirname, 'src', 'app')
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'angular2'].reverse()
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: false,
      cache: false,
      chunksSortMode: 'dependency'
    })
  ]
}
