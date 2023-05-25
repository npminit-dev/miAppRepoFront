const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "main.js",
  },
  devServer: {
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
    }),
  ],
  
};
