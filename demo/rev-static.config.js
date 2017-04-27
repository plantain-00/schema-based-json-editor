module.exports = {
    inputFiles: [
        "demo/angular.js",
        "demo/react.js",
        "demo/vue.js",
        "demo/angular.vendor.js",
        "demo/react.vendor.js",
        "demo/vue.vendor.js",
        "demo/angular.editor.js",
        "demo/react.editor.js",
        "demo/vue.editor.js",
        "demo/angular/index.ejs.html",
        "demo/react/index.ejs.html",
        "demo/vue/index.ejs.html"
    ],
    outputFiles: file => file.replace(".ejs", ""),
    json: false,
    ejsOptions: {
        rmWhitespace: true
    },
    sha: 256,
    customNewFileName: (filePath, fileString, md5String, baseName, extensionName) => baseName + "-" + md5String + extensionName,
}