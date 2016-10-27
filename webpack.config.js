const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        react: "./demo/react/index",
        angular: "./demo/angular/index"
    },
    output: {
        path: path.join(__dirname, "demo"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // })
    ]
};