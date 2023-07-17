const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'eval-source-map',
  entry: './client/index.js', // Update the entry path
  output: {
    path: path.resolve(__dirname, 'dist'), // Replace with your desired output directory
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    /**
     * proxy is required in order to make api calls to
     * express server while using hot-reload webpack server
     * routes api fetch requests from localhost:8080/api/* (webpack dev server)
     * to localhost:3000/api/* (where our Express server is running)
     */
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/assets': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match JavaScript or JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Apply Babel for transpiling
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Add any necessary presets
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html'),
    }),
  ],
};

//"start": "webpack-dev-server --open"