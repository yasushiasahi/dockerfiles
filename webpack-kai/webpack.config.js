const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  mode: isProduction ? "production" : "development",
  watch: !isProduction,
  devtool: isProduction ? false : "source-map",
  entry: {
    "js/main": "./src/js/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["last 2 versions"],
                    },
                    modules: false,
                  },
                ],
              ],
            },
          },
        ],
      },
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
        ignore: ["index.css", "index.js"],
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
  ],
}
