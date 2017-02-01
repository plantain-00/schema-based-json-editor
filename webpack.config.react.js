const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        react: "./demo/react/index",
        "react.vendor": "./demo/react/vendor",
        "react.editor": "./demo/react/editor"
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["react", "react.editor", "react.vendor"]
        }),
    ],
    resolve: {
        alias: {
            "markdown-it": "markdown-it/dist/markdown-it.min.js"
        }
    }
};