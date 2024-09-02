const webpack = require("webpack"),
    htmlWebpackPlugin = require("html-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

    module.exports = {
        entry: ["./src/client/index.js"],
        module: {
            rules: [
                {
                    test: '/\.js$/',
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
            ]
        },
    
        optimization: {
            minimizer: [
              
                new CssMinimizerPlugin(),
            ],
            minimize: true,
          },
        plugins: [
            new htmlWebpackPlugin({
                template: "./src/client/views/index.html",
                filename: "./index.html"
            }),
            new CleanWebpackPlugin({
                dry: true,
                verbose: false,
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false,
               
            }),
           
        ]
    }