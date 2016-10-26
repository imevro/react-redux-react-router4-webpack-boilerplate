import webpack from 'webpack';
import path from 'path';

const { BUILD_ID, NODE_ENV } = process.env;

export const cssGeneratedScopeName = `[name]__[local]___[hash:base64:5]`;

export const postcssPlugins = [
  require(`postcss-import`),
  require(`postcss-sassy-mixins`),
  require(`postcss-for`),
  require(`postcss-conditionals`),
  require(`postcss-simple-vars`),
  require(`postcss-color-function`),
  require(`postcss-mathjs`),
  require(`postcss-nested`),
  require(`autoprefixer`)({
    browsers: [`last 2 versions`],
  }),
];

export const svgoIconsConfig = {
  plugins: [
    {
      removeAttrs: {
        attrs: [`fill`, `fill-rule`],
      },
    },
  ],
};

export const isResMatch = (res, match) => res.indexOf(match) !== -1;

export default {
  entry: [
    path.join(__dirname, `..`, `src`, `index`),
  ],
  output: {
    path: path.join(__dirname, `..`, `build`),
  },
  module: {
    noParse: [`node_modules/react`],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: `babel?cacheDirectory=true`,
        happy: {
          id: `js_and_jsx`,
        },
      },
      {
        test: /src\/[^\/]+\/assets\/icons\/[^\.]+\.svg/,
        loader: `svg-sprite!svgo?useConfig=svgoIconsConfig`,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: `file-loader?limit=8192`,
      },
      {
        test: /\.json$/,
        loader: `json`,
      },
    ],
  },
  stats: {
    colors: true,
  },
  resolve: {
    root: path.join(__dirname, `..`, `src`),
    extensions: [``, `.js`, `.json`, `.jsx`, `.css`, `.svg`, `.jpeg`, `.jpg`, `.png`],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'BUILD_ID': JSON.stringify(BUILD_ID),
      },
    }),
  ],
  postcss: postcssPlugins,
  svgoIconsConfig,
};
