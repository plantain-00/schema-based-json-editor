module.exports = {
  build: [
    `rimraf demo/**/*.bundle-*.js`,
    `cpy ./node_modules/bootstrap/dist/css/bootstrap.min.css ./demo/css/`,
    `cpy ./node_modules/font-awesome/css/font-awesome.min.css ./demo/css/`,
    `cpy ./node_modules/dragula/dist/dragula.min.css ./demo/css/`,
    `cpy ./node_modules/font-awesome/fonts/*.* ./demo/fonts`,
    `cpy ./node_modules/highlight.js/styles/default.css ./demo/css/highlight.js/`,
    `cpy ./node_modules/markdown-tip/markdown-tip.css ./demo/css/`,
    `cpy ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css ./demo/css/`,
    `cpy ./node_modules/select2-component/select2.min.css ./demo/css/`,
    `file2variable-cli src/vue/*.template.html src/vue.template.html -o src/vue-variables.ts --html-minify --base src`,
    `file2variable-cli src/angular/*.template.html src/angular.template.html -o src/angular-variables.ts --html-minify --base src`,
    `rimraf dist`,
    `tsc -p src`,
    `cpy src/lib.d.ts dist`,
    `cpy src/libs.d.ts dist`,
    `tsc -p demo`,
    `webpack --config demo/webpack.config.js`,
    `rev-static --config demo/rev-static.config.js`
  ],
  lint: [
    `tslint "src/**/*.tsx" "demo/**/*.tsx" "src/**/*.ts" "demo/**/*.ts" "spec/**/*.ts"`,
    `standard "**/*.config.js"`
  ],
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js'
  ],
  fix: [
    `standard --fix "**/*.config.js"`
  ],
  release: [
    `clean-release`
  ]
}
