const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src/js'),
  styles: path.resolve(__dirname, '../src/styles'),
  images: path.resolve(__dirname, '../src/images'),
  build: path.resolve(__dirname, '../build')
};

const plugins = [
  new CopyWebpackPlugin([
    {
      from: PATHS.images,
      to: './images'
    }
  ]),
  // Shared code
  //new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
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
  // This plugin moves all the CSS into a separate stylesheet
  new ExtractTextPlugin('css/app.css', { allChunks: true })
];

const alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react-dom/lib/"+filename] = path.join(__dirname, "../node_modules/react/lib", filename);
});

module.exports = {
  entry: {
    app: path.resolve(PATHS.app, 'main.js'),
    vendor: ['react']
  },

  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '../'
  },

  stats: {
    colors: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.less'],
    alias
  },
  module: {
    noParse: /\.min\.js$/,
    loaders: [
      //{ test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" },
      //{test: /\jquery-ui.min.js$/, loaders: ['imports?jQuery=jquery,$=jquery,define=>false']},
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel'],
        include: PATHS.app
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader',
      'css-loader!' +
      'less-loader')
      },

      {
        test: /\.css$/,
        //include: PATHS.styles,
        loader: ExtractTextPlugin.extract('style-loader',
      'css-loader!' +
      'postcss-loader')
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
