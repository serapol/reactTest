const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src'),
  index: path.resolve(__dirname, '../src/index.html'),
  styles: path.resolve(__dirname, '../src/styles'),
  build: path.resolve(__dirname, '../build')
};

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),

  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: PATHS.index,
    hash: false,
    filename: "index.html",
    inject: "body",
  })
];

const alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react-dom/lib/"+filename] = path.join(__dirname, "../node_modules/react/lib", filename);
});

module.exports = {
  env : process.env.NODE_ENV,
  entry: {
    app: path.resolve(PATHS.app, 'index.js'),
    vendor: ['react']
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.less'],
    alias
  },
  module: {
    loaders: [
      //{test: /\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery'},
      //{ test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // loaders: ['react-hot-loader/webpack','babel'],
        loaders: ['react-hot','babel'],
        include: PATHS.app
      },
      {
        test: /\.js$/,
        loaders: ['imports?define=>false'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: plugins,
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    port: 8080
  },
  devtool: 'eval'
};
