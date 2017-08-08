const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src'),
  styles: path.resolve(__dirname, '../src/styles'),
  build: path.resolve(__dirname, '../build')
};

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),

  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  }),
  new ExtractTextPlugin('css/app.css', { allChunks: true }),
  new HtmlWebpackPlugin({
    template: path.resolve(PATHS.app, 'index.html'),
    hash: false,
    filename: "index.html",
    inject: "body",
    files: {
      css: [ "css/app.css" ],
    }
  }),
];

module.exports = {
  entry: {
    app: path.resolve(PATHS.app, 'app.js'),
    vendor: ['react']
  },

  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: './'
  },

  stats: {
    colors: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
  },
  module: {
    noParse: /\.min\.js$/,
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel'],
        include: PATHS.app
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!' + 'less-loader')
      },

      {
        test: /\.css$/,
        //include: PATHS.styles,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!' + 'postcss-loader')
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash]'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]?[hash]'
      }
    ]
  },
  plugins: plugins,
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devtool: 'source-map'
};
