'use strict';
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const HotModuleReplacementClient = path.resolve(
  _dirname, '..', 'server', 'node_modules', 'webpack-hot-middleware',
  'client?dynamicPublicPath=true&path=__webpack_hmr_client'
);

const context = require('path').resolve(__dirname);
const mode = process.env.NODE_ENV.trim() || 'development';
module.exports = {
  mode,
  entry: {
    app: [
      path.resolve(__dirname, 'app', 'app.js')
    ]
  },
  context,
  output: {
    path: path.resolve(__dirname, 'build', 'js'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: ((mode === 'development') ? 'source-map': ''), 
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'app', 'components')
    }
  },
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [ 
                  require.resolve('@babel/preset-env'), 
                  {
                    targets: {
                      browsers: [ 'last 2 versions' ]
                    },
                    modules: false
                  }
                ],
                require.resolve('@babel/preset-react')
              ],
              plugins: [
                [
                  require.resolve('@babel/plugin-transform-regenerator'),
                  {
                    async: false
                  }
                ],
                require.resolve('react-hot-loader/babel'),
                [
                  require.resolve('babel-plugin-react-css-modules'),
                  {
                    context,
                    generateScopedName: '[path]__[name]__[local]__[hash:base64:5]',
                    handleMissingStyleName: 'warn',
                    webpackHotModuleReloading: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: (mode === 'development'),
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: true,
              importLoaders: 1,
              sourceMap: (mode === 'development'),
              localIdentNam: '[path]__[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context
      }
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: (mode === 'development') ? {} : {
    minimizer: [
      new TerserPlugin()
    ]
  }
}
