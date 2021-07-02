const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      //This makes it so that when creating css it gets run through these 2 loaders
      //and then it will convert the CSS so it can be added into html through the DOM
      test: /\.css$/,
      use:['style-loader', 'css-loader']
    }
    ]
  }
};