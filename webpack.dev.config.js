const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.base.config.js");

const basePath = __dirname;

module.exports = function () {
  return webpackMerge(commonConfig, {
    devtool: 'source-map',

    devServer: {
         contentBase: './dist', // Content base
         inline: true, // Enable watch and live reload
         host: 'localhost',
         port: 8080,
         stats: 'errors-only'
    },

    output: {
      path: path.join(basePath, "dist"),
      filename: "[name].js"
    },

    module: {
      rules: [
        // *** Loading pipe for CSS ***
        {
          test: /\.css$/,
          exclude: [/node_modules/],
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: "[local]__[name]___[hash:base64:5]"
              }
            },
          ]
        },
        // *** Loading pipe for vendor CSS. No CSS Modules here ***
        {
          test: /\.css$/,
          include: [/node_modules/],
          use: [
            "style-loader",
            {
              loader: "css-loader",              
            },
          ]
        },
        // *** Loading pipe for SASS stylesheets ***
        {
          test: /\.scss$/,
          exclude: [/node_modules/],
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                camelCase: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: "[local]__[name]___[hash:base64:5]"
              }
            },
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          DEBUG_TRACES: true
        }
      })
    ],
  });
};
