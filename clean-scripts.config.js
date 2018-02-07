const { Service, checkGitStatus } = require('clean-scripts')

const tsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.@(ts|tsx)" "spec/**/*.ts" "screenshots/**/*.ts"`
const jsFiles = `"*.config.js" "spec/**/*.config.js"`
const excludeTsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.d.ts"`

const vueTemplateCommand = `file2variable-cli --config packages/vue/src/file2variable.config.js`

const angularTemplateCommand = `file2variable-cli packages/angular/src/*.template.html -o packages/angular/src/variables.ts --html-minify --base packages/angular/src`
const ngcSrcCommand = [
  `ngc -p packages/core/src`,
  `tsc -p packages/vue/src`,
  `tsc -p packages/react/src`,
  `ngc -p packages/angular/src`
]
const tscDemoCommand = [
  `ngc -p packages/core/demo`,
  `tsc -p packages/vue/demo`,
  `tsc -p packages/react/demo`,
  `ngc -p packages/angular/demo`
]
const webpackCommand = `webpack`
const revStaticCommand = `rev-static`

module.exports = {
  build: [
    {
      copy: [
        `cpy ./packages/core/node_modules/bootstrap/dist/css/bootstrap.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/font-awesome/css/font-awesome.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/dragula/dist/dragula.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/font-awesome/fonts/*.* ./packages/core/demo/fonts`,
        `cpy ./packages/core/node_modules/highlight.js/styles/default.css ./packages/core/demo/css/highlightjs/`,
        `cpy ./packages/core/node_modules/markdown-tip/dist/markdown-tip.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/github-fork-ribbon-css/gh-fork-ribbon.css ./packages/core/demo/css/`,
        `cpy ./packages/core/node_modules/select2-component/dist/select2.min.css ./packages/core/demo/css/`,
        `cpy ./packages/core/src/libs.d.ts ./packages/core/dist`
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
