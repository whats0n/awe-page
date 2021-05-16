const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './scripts/index.ts',
  devtool: process.env.NODE_ENV !== 'production' && 'inline-source-map',
  mode: process.env.NODE_ENV || 'production',
  context: path.resolve(__dirname, './src'),
  output: {
    filename: 'scripts/index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
    ],
  },
  resolve: {
    extensions: [ '.js', '.ts', '.d.ts', '.scss', '.css' ],
    alias: {
      '~': path.resolve(__dirname, './src/scripts')
    }
  },
  devServer: {
    watchContentBase: true,
    writeToDisk: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    host: '0.0.0.0'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      minify: true,
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts', 'd.ts'],
      fix: true
    })
  ]
}
