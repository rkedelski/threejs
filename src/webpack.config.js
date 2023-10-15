const path = require("path");

const config = {
  entry: "./src/client.ts",
  output: {
    filename: "../dist/main.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    compress: true,
    client: {
      logging: "verbose",
    },
  },
};

module.exports = config;
