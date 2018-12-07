const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'
const entrys = process.env.ENTRYS
let entry = {}
for (const path of entrys.split('&&')) {
  entry[path.split('.')[0]] = `./src/${path}`
}

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  watch: isDevelopment,
  devtool: isDevelopment ? 'inline-source-map' : false,
  entry: entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}
