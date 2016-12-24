const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        angular: "./demo/angular/index",
        "angular.vendor": "./demo/angular/vendor",
        "angular.editor": "./demo/angular/editor"
    },
    output: {
        path: path.join(__dirname, "demo"),
        filename: "[name].js"
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
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["angular", "angular.editor", "angular.vendor"]
        }),
    ],
    resolve: {
        alias: {
            "markdown-it": "markdown-it/dist/markdown-it.min.js"
        }
    }
};