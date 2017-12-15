const { Service, checkGitStatus } = require('clean-scripts')

const tsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.@(ts|tsx)" "spec/**/*.ts" "screenshots/**/*.ts"`
const jsFiles = `"*.config.js" "spec/**/*.config.js"`
const excludeTsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.d.ts"`

const vueArrayTemplateCommand = `file2variable-cli packages/vue/src/array-editor.template.html -o packages/vue/src/array-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "ArrayEditor" --vue-type-path "./array-editor"`
const vueBooleanTemplateCommand = `file2variable-cli packages/vue/src/boolean-editor.template.html -o packages/vue/src/boolean-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "BooleanEditor" --vue-type-path "./boolean-editor"`
const vueDescriptionTemplateCommand = `file2variable-cli packages/vue/src/description.template.html -o packages/vue/src/description-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "Description" --vue-type-path "./description"`
const vueEditorTemplateCommand = `file2variable-cli packages/vue/src/editor.template.html -o packages/vue/src/editor-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "Editor" --vue-type-path "./editor"`
const vueIconTemplateCommand = `file2variable-cli packages/vue/src/icon.template.html -o packages/vue/src/icon-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "Icon" --vue-type-path "./icon"`
const vueIndexTemplateCommand = `file2variable-cli packages/vue/src/index.template.html -o packages/vue/src/index-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "JSONEditor" --vue-type-path "./index"`
const vueNullTemplateCommand = `file2variable-cli packages/vue/src/null-editor.template.html -o packages/vue/src/null-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "NullEditor" --vue-type-path "./null-editor"`
const vueNumberTemplateCommand = `file2variable-cli packages/vue/src/number-editor.template.html -o packages/vue/src/number-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "NumberEditor" --vue-type-path "./number-editor"`
const vueObjectTemplateCommand = `file2variable-cli packages/vue/src/object-editor.template.html -o packages/vue/src/object-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "ObjectEditor" --vue-type-path "./object-editor"`
const vueOptionalTemplateCommand = `file2variable-cli packages/vue/src/optional.template.html -o packages/vue/src/optional-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "Optional" --vue-type-path "./optional"`
const vueStringTemplateCommand = `file2variable-cli packages/vue/src/string-editor.template.html -o packages/vue/src/string-variables.ts --html-minify --base packages/vue/src/  --vue --vue-type-name "StringEditor" --vue-type-path "./string-editor"`

const angularTemplateCommand = `file2variable-cli packages/angular/src/*.template.html -o packages/angular/src/variables.ts --html-minify --base packages/angular/src`
const ngcSrcCommand = [
  `ngc -p packages/core/src`,
  `cd ./packages/vue/ && npm run tsc`,
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
        `cpy ./packages/core/src/lib.d.ts ./packages/core/dist`,
        `cpy ./packages/core/src/libs.d.ts ./packages/core/dist`
      ],
      version: [
        {
          js: [
            {
              vue: [
                vueArrayTemplateCommand,
                vueBooleanTemplateCommand,
                vueDescriptionTemplateCommand,
                vueEditorTemplateCommand,
                vueIconTemplateCommand,
                vueIndexTemplateCommand,
                vueNullTemplateCommand,
                vueNumberTemplateCommand,
                vueObjectTemplateCommand,
                vueOptionalTemplateCommand,
                vueStringTemplateCommand
              ],
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
    commit: `commitlint --from=HEAD~1`
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
    vue: {
      vueArrayTemplateCommand: `${vueArrayTemplateCommand} --watch`,
      vueBooleanTemplateCommand: `${vueBooleanTemplateCommand} --watch`,
      vueDescriptionTemplateCommand: `${vueDescriptionTemplateCommand} --watch`,
      vueEditorTemplateCommand: `${vueEditorTemplateCommand} --watch`,
      vueIconTemplateCommand: `${vueIconTemplateCommand} --watch`,
      vueIndexTemplateCommand: `${vueIndexTemplateCommand} --watch`,
      vueNullTemplateCommand: `${vueNullTemplateCommand} --watch`,
      vueNumberTemplateCommand: `${vueNumberTemplateCommand} --watch`,
      vueObjectTemplateCommand: `${vueObjectTemplateCommand} --watch`,
      vueOptionalTemplateCommand: `${vueOptionalTemplateCommand} --watch`,
      vueStringTemplateCommand: `${vueStringTemplateCommand} --watch`
    },
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
