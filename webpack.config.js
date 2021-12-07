const path = require("path");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry:{
    index:"/src/index.js",
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    port: 8081,
  },
  output: {
    filename:"js/[name].bundel.js",
    clean: true,
  },
  module: {
    rules: [
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
            loader: "simple-pug-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      favicon: "./src/img/favicon.ico",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(
      {
        filename: "css/[name].css"
      }
    ),
  ],
};