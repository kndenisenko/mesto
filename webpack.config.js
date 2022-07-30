const root = require('path'); // Необходимая переменная, чтобы вебпак сам разобрался с путями
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Плагин для очистки папки dist
const htmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для очистки папки dist

module.exports = {
  entry: './src/scripts/index.js',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: root.resolve(__dirname, 'dist'), 
  },
  devServer: {
    static: { directory: root.join(__dirname, 'dist') }, 
    compress: true,
    port: 8080,
    open: { // Чтобы открывался хром вместо дефолтного браузера, для мака использовать 'Google Chrome'
      app: {
        name: 'chrome',
      },
    },
  },
  plugins: [
//    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  module: {
    rules:[
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(|gif|png|jpg|jpeg|svg|woff(2)?|ttf)$/, type: 'asset/resource' }
    ],
  },
}
