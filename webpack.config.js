const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        react: "./demo/react/index"
    },
    output: {
        path: path.join(__dirname, "demo"),
        filename: "[name].bundle.js"
    }
};