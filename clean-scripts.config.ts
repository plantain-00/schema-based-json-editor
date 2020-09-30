const tsFiles = `"packages/@(core|vue|react)/@(src|demo)/**/*.@(ts|tsx)"`
const excludeTsFiles = `"packages/@(core|vue|react)/@(src|demo)/**/*.d.ts"`

const vueTemplateCommand = `file2variable-cli --config packages/vue/src/file2variable.config.ts`

const tscCoreSrcCommand = `tsc -p packages/core/src`
const tscVueSrcCommand = `tsc -p packages/vue/src`
const tscReactSrcCommand = `tsc -p packages/react/src`

const tscCoreDemoCommand = `tsc -p packages/core/demo`

const webpackVueCommand = `webpack --config packages/vue/demo/webpack.config.ts`
const webpackReactCommand = `webpack --config packages/react/demo/webpack.config.ts`

const revStaticCommand = `rev-static`

const isDev = process.env.NODE_ENV === 'development'

export default {
  build: [
    {
      copy: isDev ? undefined : [
        `cpy ./node_modules/bootstrap/dist/css/bootstrap.min.css ./packages/core/demo/css/`,
        `cpy ./node_modules/font-awesome/css/font-awesome.min.css ./packages/core/demo/css/`,
        `cpy ./node_modules/dragula/dist/dragula.min.css ./packages/core/demo/css/`,
        `cpy ./node_modules/font-awesome/fonts/*.* ./packages/core/demo/fonts`,
        `cpy ./node_modules/highlight.js/styles/default.css ./packages/core/demo/css/highlightjs/`,
        `cpy ./node_modules/markdown-tip/dist/markdown-tip.css ./packages/core/demo/css/`,
        `cpy ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css ./packages/core/demo/css/`,
        `cpy ./node_modules/select2-component/dist/select2.min.css ./packages/core/demo/css/`,
        `cpy ./node_modules/file-uploader-component/dist/file-uploader.min.css ./packages/core/demo/css/`,
        `cpy ./node_modules/antd/dist/antd.min.css ./packages/core/demo/css/`,
        `cpy ./node_modules/element-ui/lib/theme-chalk/index.css ./packages/core/demo/css/element-ui/`,
        `cpy ./node_modules/element-ui/lib/theme-chalk/fonts/*.* ./packages/core/demo/css/element-ui/fonts/`,
        `cpy ./node_modules/iview/dist/styles/iview.css ./packages/core/demo/css/`,
        `cpy ./node_modules/iview/dist/styles/fonts/*.* ./packages/core/demo/css/fonts/`,
        `cpy ./node_modules/@blueprintjs/core/lib/css/blueprint.css ./packages/core/demo/css/`,
        `cpy ./node_modules/monaco-editor/min/vs/loader.js ./packages/core/demo/vs/`,
        `cpy ./node_modules/monaco-editor/min/vs/language/json/jsonMode.js ./packages/core/demo/vs/language/json/`,
        `cpy ./node_modules/monaco-editor/min/vs/language/json/jsonWorker.js ./packages/core/demo/vs/language/json/`,
        `cpy ./node_modules/monaco-editor/min/vs/language/typescript/tsMode.js ./packages/core/demo/vs/language/typescript/`,
        `cpy ./node_modules/monaco-editor/min/vs/language/typescript/tsWorker.js ./packages/core/demo/vs/language/typescript/`,
        `cpy ./node_modules/monaco-editor/min/vs/editor/editor.main.js ./packages/core/demo/vs/editor/`,
        `cpy ./node_modules/monaco-editor/min/vs/editor/editor.main.css ./packages/core/demo/vs/editor/`,
        `cpy ./node_modules/monaco-editor/min/vs/editor/editor.main.nls.js ./packages/core/demo/vs/editor/`,
        `cpy ./node_modules/monaco-editor/min/vs/base/worker/workerMain.js ./packages/core/demo/vs/base/worker/`,
        `cpy ./node_modules/monaco-editor/min/vs/basic-languages/typescript/typescript.js ./packages/core/demo/vs/basic-languages/typescript/`,
        `cpy ./node_modules/monaco-editor/min/vs/basic-languages/javascript/javascript.js ./packages/core/demo/vs/basic-languages/javascript/`
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
                isDev ? undefined : `rollup --config packages/vue/src/rollup.config.js`,
                webpackVueCommand
              ],
              react: [
                tscReactSrcCommand,
                isDev ? undefined : `rollup --config packages/react/src/rollup.config.js`,
                webpackReactCommand
              ]
            }
          ],
          clean: `rimraf "packages/@(core|vue|react)/demo/**/@(*.bundle-*.js|*.bundle-*.css)"`
        },
        revStaticCommand
      ]
    }
  ],
  lint: {
    ts: `eslint --ext .js,.ts ${tsFiles}`,
    export: `no-unused-export ${tsFiles} --exclude ${excludeTsFiles}`,
    markdown: `markdownlint README.md change_logs.md`,
    typeCoverage: {
      core: 'cd packages/core && type-coverage -p src --strict',
      vue: 'cd packages/vue && type-coverage -p src --strict --ignore-files "src/variables.ts"',
      react: 'cd packages/react && type-coverage -p src --strict'
    }
  },
  test: [
    // 'ava'
  ],
  fix: `eslint --ext .js,.ts ${tsFiles} --fix`,
  watch: {
    vueTemplateCommand: `${vueTemplateCommand} --watch`,
    tscCoreSrcCommand: `${tscCoreSrcCommand} --watch`,
    tscVueSrcCommand: `${tscVueSrcCommand} --watch`,
    tscReactSrcCommand: `${tscReactSrcCommand} --watch`,
    tscCoreDemoCommand: `${tscCoreDemoCommand} --watch`,
    webpackVueCommand: `${webpackVueCommand} --watch`,
    webpackReactCommand: `${webpackReactCommand} --watch`,
    revStaticCommand: `${revStaticCommand} --watch`
  }
}
