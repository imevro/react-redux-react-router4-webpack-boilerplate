import path from 'path';
import express from 'express';
import webpack from 'webpack';

import devWebpack from 'webpack-dev-middleware';
import hotWebpack from 'webpack-hot-middleware';

import httpProxy from 'http-proxy-middleware';
import config from './webpack.config.dev.babel';

const compiled = webpack(config);

const webpackOptions = {
  noInfo: true,
  publicPath: config.output.publicPath,
  contentBase: `../src`,
  stats: {
    colors: true,
  },
  historyApiFallback: true,
};

const proxyOptions = {
  changeOrigin: true,
  target: `/`,
  pathRewrite: {
    '^/api-dev': ``,
  },
};

const dev = devWebpack(compiled, webpackOptions);
const hot = hotWebpack(compiled);
const proxy = httpProxy(proxyOptions);
const app = express();

app.use(dev);
app.use(hot);
app.use(`/api-dev/*`, proxy);

app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `..`, `src`, `index.dev.html`));
});

app.listen(3000, `localhost`, (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }

  console.log(`Listening at http://localhost:%s`, 3000); // eslint-disable-line no-console
});
