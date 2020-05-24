const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
      path.resolve(__dirname, '../src') + '/js/app.js',
      path.resolve(__dirname, '../src') + '/scss/app.scss'
    ],
    output: {
      path: path.resolve(__dirname, '../public'),
      filename: './js/app.bundle.js'
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
      watchContentBase: true,
      hot: true,
      open: true,
      inline: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('./src/index.html'),
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: './css/app.bundle.css'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sc|sa|c)ss$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                  ident: 'postcss',
                  sourceMap: true,
                  plugins: () => [
                      require('autoprefixer')()
                  ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader'
          }
        }
      ]
    }
};