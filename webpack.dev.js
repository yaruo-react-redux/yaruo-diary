const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const os = require('os');

let devBrowser = 'Google Chrome';
switch (os.platform()) {
  case 'win32':
    devBrowser = 'chrome';
    break;
  case 'linux':
    devBrowser = 'google-chrome';
    break;
  default:
    break;
}

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    open: {
      app: {
        name: devBrowser,
      },
    },
    host: 'localhost',
    port: 3000,
    static: './public',
  },
});
