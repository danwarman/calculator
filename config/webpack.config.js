var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/js/app.js',
    output: {
      path: path.resolve(__dirname, '../public/js'),
      filename: 'app.bundle.js'
    },
    watch: true,
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
        }
      ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};