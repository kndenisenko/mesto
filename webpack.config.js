const root = require('path'); // Необходимая переменная, чтобы вебпак сам разобрался с путями
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Плагин для очистки папки dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Плагин для экспорта CSS

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
  plugins: [ // подключение плагинов
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new htmlWebpackPlugin({ template: './src/index.html' }),
  ],
  module: {
    rules:[ // Настройка плагинов
      { test: /\.css$/i, use: [  // Настройка MiniCssExtractPlugin и postcss c autoprefixer
        MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader',
          options: { importLoaders: 1 }  
        },
        "postcss-loader"
      ] },
      { test: /\.(|gif|png|jpg|jpeg|svg|woff(2)?|ttf)$/, type: 'asset/resource' }, // подключение загрузки изображений
      { // Настройка бабеля
        test: /\.m?js$/, exclude: /node_modules/, 
        use: { loader: "babel-loader", options: { presets: ['@babel/preset-env'] }
        }
      }
    ],
  },
}
