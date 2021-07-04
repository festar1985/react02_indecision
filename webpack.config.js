const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "myapp.js",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_module/,
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.s?css$/,
      },
    ],
  },
};
