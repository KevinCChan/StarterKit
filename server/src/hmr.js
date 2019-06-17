'use strict';
const path = require('path');
const webpack = require('webpack');
const webpack_hot_middleware = require('webpack-hot-middleware');
const webpack_dev_middleware = require('webpack-dev-middleware');

const HotModuleReplacementPath = '/__webpack_hmr_client';
const HotModuleReplacementClient = path.resolve('node_modules', 'webpack-hot-middleware',
  `client?dynamicPublicPath=true&path=${HotModuleReplacementPath.slice(1)}`
);

// Take an Express server as an argument to decorate
module.exports = (app, config_path) => {
  const NODE_ENV = (process.env.NODE_ENV||'').trim();

  if (NODE_ENV === 'production') {
    return;
  }

  const config = require(config_path);
  config.entry.app.unshift(HotModuleReplacementClient);
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);

  app.use(webpack_dev_middleware(compiler, {
    logLevel: 'warn',
    publicPath: config.output.publicPath,
    writeToDisk: (filename) => (!((/hot-update\.js(|on)/).test(filename)))
  }));

  app.use(webpack_hot_middleware(compiler, { path: HotModuleReplacementPath }));
};
