const webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: {
    js: "./js/app.tsx"
  },
  output: {
    path: __dirname + '/dist/js',
    filename: "app.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  }
}
