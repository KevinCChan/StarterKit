'use strict';
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const context = require('path').resolve(__dirname);
const mode = (process.env.NODE_ENV||'development').trim();

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
    noParse: /jquery/,
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
                    generateScopedName: '[name]__[local]__[hash:base64:5]',
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
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              importLoaders: 1,
              sourceMap: (mode === 'development')
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
};
