const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        vue: "./demo/vue/index",
        "vue.vendor": "./demo/vue/vendor",
        "vue.editor": "./demo/vue/editor"
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
            name: ["vue", "vue.editor", "vue.vendor"]
        }),
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js",
            "markdown-it": "markdown-it/dist/markdown-it.min.js"
        }
    }
};