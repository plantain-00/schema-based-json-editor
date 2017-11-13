const { Service, execAsync } = require('clean-scripts')

const tsFiles = `"src/**/*.ts" "src/**/*.tsx" "spec/**/*.ts" "demo/**/*.ts" "demo/**/*.tsx" "screenshots/**/*.ts"`
const jsFiles = `"*.config.js" "demo/*.config.js" "spec/**/*.config.js"`
const excludeTsFiles = `"demo/**/*.d.ts"`

const vueTemplateCommand = `file2variable-cli src/vue/*.template.html src/vue.template.html -o src/vue-variables.ts --html-minify --base src`
const angularTemplateCommand = `file2variable-cli src/angular/*.template.html src/angular.template.html -o src/angular-variables.ts --html-minify --base src`
const ngcSrcCommand = [
  `tsc -p src`,
  `ngc -p src/tsconfig.aot.json`
]
const tscDemoCommand = [
  `tsc -p demo`,
  `ngc -p demo/tsconfig.aot.json`
]
const webpackCommand = `webpack --display-modules --config demo/webpack.config.js`
const revStaticCommand = `rev-static --config demo/rev-static.config.js`

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
              vue: vueTemplateCommand,
              angular: angularTemplateCommand
            },
            ngcSrcCommand,
            tscDemoCommand,
            webpackCommand
          ],
          clean: `rimraf demo/**/*.bundle-*.js`
        },
        revStaticCommand
      ]
    }
  ],
  lint: {
    ts: `tslint ${tsFiles} --exclude ${excludeTsFiles}`,
    js: `standard ${jsFiles}`,
    export: `no-unused-export ${tsFiles} --exclude ${excludeTsFiles}`
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
    ts: `tslint --fix ${tsFiles} --exclude ${excludeTsFiles}`,
    js: `standard --fix ${jsFiles}`
  },
  release: `clean-release`,
  watch: {
    vue: `${vueTemplateCommand} --watch`,
    angular: `${angularTemplateCommand} --watch`,
    tsc: `${ngcSrcCommand} --watch`,
    demo: `${tscDemoCommand} --watch`,
    webpack: `${webpackCommand} --watch`,
    rev: `${revStaticCommand} --watch`
  },
  screenshot: [
    new Service(`http-server -p 8000`),
    `tsc -p screenshots`,
    `node screenshots/index.js`
  ]
}
