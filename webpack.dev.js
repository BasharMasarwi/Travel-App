const common = require("./webpack.common.js"),
    { merge } = require("webpack-merge"),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin"),
    path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
    },
    optimization: {
        minimizer: [
          
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
})