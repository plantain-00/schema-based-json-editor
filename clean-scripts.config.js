const childProcess = require('child_process')
const util = require('util')
const { Service } = require('clean-scripts')

const execAsync = util.promisify(childProcess.exec)

const tsFiles = `"src/**/*.ts" "src/**/*.tsx" "spec/**/*.ts" "demo/**/*.ts" "demo/**/*.tsx" "screenshots/**/*.ts"`
const jsFiles = `"*.config.js" "demo/*.config.js"`

module.exports = {
  build: [
    `rimraf dist`,
    `mkdirp dist`,
    {
      copy: [
        `cpy ./node_modules/bootstrap/dist/css/bootstrap.min.css ./demo/css/`,
        `cpy ./node_modules/font-awesome/css/font-awesome.min.css ./demo/css/`,
        `cpy ./node_modules/dragula/dist/dragula.min.css ./demo/css/`,
        `cpy ./node_modules/font-awesome/fonts/*.* ./demo/fonts`,
        `cpy ./node_modules/highlight.js/styles/default.css ./demo/css/highlight.js/`,
        `cpy ./node_modules/markdown-tip/markdown-tip.css ./demo/css/`,
        `cpy ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css ./demo/css/`,
        `cpy ./node_modules/select2-component/select2.min.css ./demo/css/`,
        `cpy src/lib.d.ts dist`,
        `cpy src/libs.d.ts dist`
      ],
      version: [
        {
          js: [
            {
              vue: `file2variable-cli src/vue/*.template.html src/vue.template.html -o src/vue-variables.ts --html-minify --base src`,
              angular: `file2variable-cli src/angular/*.template.html src/angular.template.html -o src/angular-variables.ts --html-minify --base src`
            },
            `ngc -p src`,
            `tsc -p demo`,
            `webpack --display-modules --config demo/webpack.config.js`
          ],
          clean: `rimraf demo/**/*.bundle-*.js`
        },
        `rev-static --config demo/rev-static.config.js`
      ]
    }
  ],
  lint: {
    ts: `tslint ${tsFiles}`,
    js: `standard ${jsFiles}`,
    export: `no-unused-export ${tsFiles} --exclude "src/compiled/**/*"`
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js',
    async () => {
      const { stdout } = await execAsync('git status -s')
      if (stdout) {
        console.log(stdout)
        throw new Error(`generated files doesn't match.`)
      }
    }
  ],
  fix: {
    ts: `tslint --fix ${tsFiles}`,
    js: `standard --fix ${jsFiles}`
  },
  release: `clean-release`,
  watch: {
    vue: `file2variable-cli src/vue/*.template.html src/vue.template.html -o src/vue-variables.ts --html-minify --base src --watch`,
    angular: `file2variable-cli src/angular/*.template.html src/angular.template.html -o src/angular-variables.ts --html-minify --base src --watch`,
    tsc: `tsc -p src --watch`,
    demo: `tsc -p demo --watch`,
    webpack: `webpack --display-modules --config demo/webpack.config.js --watch`,
    rev: `rev-static --config demo/rev-static.config.js --watch`
  },
  screenshot: [
    new Service(`http-server -p 8000`),
    `tsc -p screenshots`,
    `node screenshots/index.js`
  ]
}
