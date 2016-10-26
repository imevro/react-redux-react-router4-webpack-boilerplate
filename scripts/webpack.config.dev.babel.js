import webpack from 'webpack';
import config, { cssGeneratedScopeName } from './webpack.config.shared';

export default {
  ...config,
  entry: [
    ...config.entry,
    `webpack-hot-middleware/client`,
  ],
  output: {
    ...config.output,
    filename: `app.js`,
    publicPath: `/static/`,
  },
  module: {
    ...config.module,
    loaders: [
      ...config.module.loaders,
      { test: /\.scss$/, loader: `style!css!sass` },
      { test: /\.css/, loader: `style!css?modules&importLoaders=1&localIdentName=${cssGeneratedScopeName}!postcss` },
    ],
  },
  plugins: [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  devtool: `eval-source-map`,
};
