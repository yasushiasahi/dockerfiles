const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  mode: isProduction ? "production" : "development",
  watch: !isProduction,
  entry: {
    style: "./src/css/index.css",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "./src/",
        to: "",
        ignore: ["index.css"],
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
  ],
}
