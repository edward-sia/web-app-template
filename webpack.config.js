const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = (env, args) => {
  const dotEnvFilePath = args.mode && args.mode === 'production' ? './.env.production' : './.env'
  const remotes = require('dotenv').config({ path: dotEnvFilePath }).parsed

  return {
    entry: "./src/index",
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 3000,
      historyApiFallback: true,
      hot: false,
      hotOnly: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
      },
    },
    resolve: {
      extensions: [".js", ".mjs", ".jsx", ".css"],
          alias: {
        events: "events",
      },
    },
    output: {
      publicPath: "auto",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "webAppTemplate",
        filename: "remoteEntry.js",
        remotes: {
          otherApp1: `otherApp1@${remotes.WEB_OTHER_APP1}/remoteEntry.js`
        },
        exposes: {
          "./Shell": "./src/Shell"
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  }
};
