const path = require("path");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');

const htmlWebpackPlugins = glob.sync('src/pages/**/*.pug')
  .map((item) => new HtmlWebpackPlugin({
    template: item.slice(item.indexOf('/') + 1),
    filename: `${item.slice(item.lastIndexOf('-') + 1, -4)}.html`,
    chunks: ['index'],
    inject: 'body',
  }));


module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry:{
    index:"./index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'import-glob-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: "images/[name][ext][query]"
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: "fonts/[name][ext][query]"
      },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new HtmlWebpackPlugin({
    template: "index.pug"
    }),
    new MiniCssExtractPlugin(
      {
        filename: "css/[name].css"
      }
    ),
  ],
};