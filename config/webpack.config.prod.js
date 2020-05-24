const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['public']
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('./src/index.html'),
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: './css/app.bundle.css'
      })
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
            MiniCssExtractPlugin.loader,
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