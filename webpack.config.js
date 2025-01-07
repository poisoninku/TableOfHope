const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development", // Set mode to development for devServer
  devServer: {
    static: path.resolve(__dirname, "dist"), // Serve files from the "dist" folder
    port: 3000, // Specify the port you want to use
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement (HMR)
    compress: true, // Enable gzip compression for better performance
    historyApiFallback: true, // Redirect 404s to index.html (useful for SPAs)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader", // Use Babel for transpiling JavaScript
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // CSS handling
      },
    ],
  },
};
