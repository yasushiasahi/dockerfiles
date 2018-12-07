const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

const entryJS = process.env.ENTRY_JS
const entryScss = process.env.ENTRY_SCSS
const isProduction = process.env.NODE_ENV === "production"
const isSameName = process.env.SAME_NAME === "true"

const entryJSName = entryJS.slice(entryJS.lastIndexOf("/") + 1)
const outJS = isSameName ? `/${entryJSName.split(".")[0]}` : "/main"
const outputJSDir = entryJS.slice(0, entryJS.lastIndexOf("/")) + outJS

const entryScssName = entryScss.slice(entryScss.lastIndexOf("/") + 1)
const outSCSS = isSameName ? `/${entryScssName.split(".")[0]}` : "/main"
const outputCss =
  entryScss.slice(0, entryScss.lastIndexOf("/")) + outSCSS + ".css"

module.exports = {
  mode: isProduction ? "production" : "development",
  watch: !isProduction,
  devtool: isProduction ? false : "source-map",
  entry: {
    [outputJSDir]: `./src/${entryJS}`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 2,
              sourceMap: !isProduction,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
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
        ignore: [entryJSName, entryScssName],
      },
    ]),
    new MiniCssExtractPlugin({
      filename: outputCss,
    }),
  ],
}
