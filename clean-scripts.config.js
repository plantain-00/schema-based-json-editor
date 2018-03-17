const { Service, checkGitStatus } = require('clean-scripts')

const tsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.@(ts|tsx)" "spec/**/*.ts" "screenshots/**/*.ts"`
const jsFiles = `"*.config.js" "spec/**/*.config.js"`
const excludeTsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.d.ts"`

const vueTemplateCommand = `file2variable-cli --config packages/vue/src/file2variable.config.js`
const angularTemplateCommand = `file2variable-cli packages/angular/src/*.template.html -o packages/angular/src/variables.ts --html-minify --base packages/angular/src`

const tscCoreSrcCommand = `ngc -p packages/core/src`
const tscVueSrcCommand = `tsc -p packages/vue/src`
const tscReactSrcCommand = `tsc -p packages/react/src`
const tscAngularSrcCommand = `ngc -p packages/angular/src`

const tscCoreDemoCommand = `ngc -p packages/core/demo`
const tscVueDemoCommand = `tsc -p packages/vue/demo`
const tscReactDemoCommand = `tsc -p packages/react/demo`
const tscAngularDemoCommand = `ngc -p packages/angular/demo`

const webpackVueCommand = `webpack --config packages/vue/demo/webpack.config.js`
const webpackReactCommand = `webpack --config packages/react/demo/webpack.config.js`
const webpackAngularJitCommand = `webpack --config packages/angular/demo/jit/webpack.config.js`
const webpackAngularAotCommand = `webpack --config packages/angular/demo/aot/webpack.config.js`

const revStaticCommand = `rev-static`

module.exports = {
  build: [
    {
      copy: [
        `cpy ./packages/core/node_modules/bootstrap/dist/css/bootstrap.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/bootstrap/fonts/*.* ./packages/core/demo/fonts`,
        `cpy ./packages/core/node_modules/font-awesome/css/font-awesome.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/dragula/dist/dragula.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/font-awesome/fonts/*.* ./packages/core/demo/fonts`,
        `cpy ./packages/core/node_modules/highlight.js/styles/default.css ./packages/core/demo/css/highlightjs/`,
        `cpy ./packages/core/node_modules/markdown-tip/dist/markdown-tip.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/github-fork-ribbon-css/gh-fork-ribbon.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/select2-component/dist/select2.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/file-uploader-component/dist/file-uploader.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/antd/dist/antd.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/element-ui/lib/theme-chalk/index.css ./packages/core/demo/css/element-ui/`,
        `cpy ./packages/core/node_modules/element-ui/lib/theme-chalk/fonts/*.* ./packages/core/demo/css/element-ui/fonts/`,
        `cpy ./packages/core/src/libs.d.ts ./packages/core/dist`
      ],
      version: [
        {
          js: [
            tscCoreSrcCommand,
            tscCoreDemoCommand,
            {
              vue: [
                vueTemplateCommand,
                tscVueSrcCommand,
                `rollup --config packages/vue/src/rollup.config.js`,
                tscVueDemoCommand,
                webpackVueCommand
              ],
              react: [
                tscReactSrcCommand,
                `rollup --config packages/react/src/rollup.config.js`,
                tscReactDemoCommand,
                webpackReactCommand
              ],
              angular: [
                angularTemplateCommand,
                tscAngularSrcCommand,
                tscAngularDemoCommand,
                {
                  webpackAngularJitCommand,
                  webpackAngularAotCommand
                }
              ]
            }
          ],
          clean: `rimraf "packages/@(core|vue|react|angular)/demo/**/@(*.bundle-*.js|*.bundle-*.css)"`
        },
        revStaticCommand
      ]
    }
  ],
  lint: {
    ts: `tslint ${tsFiles} --exclude ${excludeTsFiles}`,
    js: `standard ${jsFiles}`,
    export: `no-unused-export ${tsFiles} --exclude ${excludeTsFiles}`,
    commit: `commitlint --from=HEAD~1`,
    markdown: `markdownlint README.md change_logs.md`
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js',
    () => checkGitStatus()
  ],
  fix: {
    ts: `tslint --fix ${tsFiles} --exclude ${excludeTsFiles}`,
    js: `standard --fix ${jsFiles}`
  },
  watch: {
    vueTemplateCommand: `${vueTemplateCommand} --watch`,
    angularTemplateCommand: `${angularTemplateCommand} --watch`,
    tscCoreSrcCommand: `${tscCoreSrcCommand} --watch`,
    tscVueSrcCommand: `${tscVueSrcCommand} --watch`,
    tscReactSrcCommand: `${tscReactSrcCommand} --watch`,
    tscAngularSrcCommand: `${tscAngularSrcCommand} --watch`,
    tscCoreDemoCommand: `${tscCoreDemoCommand} --watch`,
    tscVueDemoCommand: `${tscVueDemoCommand} --watch`,
    tscReactDemoCommand: `${tscReactDemoCommand} --watch`,
    tscAngularDemoCommand: `${tscAngularDemoCommand} --watch`,
    webpackVueCommand: `${webpackVueCommand} --watch`,
    webpackReactCommand: `${webpackReactCommand} --watch`,
    webpackAngularJitCommand: `${webpackAngularJitCommand} --watch`,
    webpackAngularAotCommand: `${webpackAngularAotCommand} --watch`,
    revStaticCommand: `${revStaticCommand} --watch`
  },
  screenshot: [
    new Service(`http-server -p 8000`),
    `tsc -p screenshots`,
    `node screenshots/index.js`
  ]
}
