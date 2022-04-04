const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  devtool: 'inline-source-map',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new ESLintPlugin({exclude: ['node_modules', 'dist'], extensions: ['.ts'], emitError: true})],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: 'inline-source-map',
};
