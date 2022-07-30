const root = require('path'); // Необходимая переменная, чтобы вебпак сам разобрался с путями

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
  }
}
