import webpack from 'webpack';
import path from 'path';
import config, { cssGeneratedScopeName } from './webpack.config.shared';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import ExtractSVGPlugin from 'svg-sprite-loader/lib/extract-svg-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import HappyPack from 'happypack';

const vendor = [
  `dthttp`,
  `lodash`,
  `classnames`,

  `react`,
  `react-dom`,
  `react-redux`,

  `react-router`,

  `redux-logger`,
  `redux-thunk`,

  `react-formatted`,
  `react-helmet`,
  `redux-actions`,

  `react-router-redux`,
  `redux-persist`,

  `redux-segment`,

  `redux`,
  `redux-form`,

  `mousetrap`,
  `react-portal`,
  `react-markdown`,
  `react-motion`,
  `react-masonry-component`,
  `react-slick`,
  `react-scroll`,
];

export default {
  ...config,
  entry: {
    app: path.join(__dirname, `..`, `src`, `index`),
    vendor,
  },
  output: {
    ...config.output,
    filename: `/bundle.[chunkhash].js`,
  },
  module: {
    ...config.module,
    loaders: [
      ...config.module.loaders,
      // { test: /src\/[^\/]+\/assets\/icons\/[^\.]+\.svg/, loader: ExtractSVGPlugin.extract(`svg-sprite!svgo?useConfig=svgoIconsConfig&extract=true`) },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(`style`, `!css?modules&minimize&importLoaders=1&localIdentName=${cssGeneratedScopeName}!postcss`),
      },
    ],
  },
  plugins: [
    ...config.plugins,
    new webpack.optimize.CommonsChunkPlugin({
      name: `vendor`,
      filename: `/vendor.[chunkhash].js`,
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: `manifest`,
      filename: `/vendor.manifest.js`,
      chunks: [`vendor`],
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      // ...credentials,
      template: path.join(__dirname, `..`, `src`, `index.production.html`),
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
      },
    }),
    new ExtractTextPlugin(`/bundle.[contenthash].css`, {
      allChunks: true,
    }),
    // new ExtractSVGPlugin(`icons-sprite.svg`),
    new ManifestPlugin(),
    new HappyPack({
      id: `js_and_jsx`,
      verbose: false,
      cacheContext: {
        env: process.env.NODE_ENV,
      },
    }),
  ],
  // devtool: `hidden-source-map`,
  devtool: `source-map`,
};
