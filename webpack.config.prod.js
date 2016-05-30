var path = require("path");
var webpack = require("webpack");
var HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: "./index.html",
      inject: "body"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ["babel"],
      include: path.join(__dirname, "src")
    },
    {test: /\.css$/, loader: "style-loader!css-loader"},
    {test: /\.png$/, loader: "file-loader?name=[name].[ext]" },
    {test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts.[ext]" }

    ],
    noParse: /dist\/ol.js/
  }
};
