const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
 
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: 'auto',
  },
  remotes: {
    app1: 'app-host'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'app_remote',
      filename: 'remoteEntry.js', // This file will be loaded remotely by the host.
      exposes: {
        './Button': './src/Button', // Expose the Button component.
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
};