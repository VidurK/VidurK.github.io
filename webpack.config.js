const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
      bundle: './index.js',
      app: './client/index.js'
  },
  output: {
    path: __dirname + '/__build__',
    filename: '[name].entry.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
         test: /\.html$/,
         loader: "raw-loader"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
