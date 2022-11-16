export default {
  inputFiles: [
    'packages/@(vue|react|react-composable-json-editor)/demo/**/@(index|editor|vendor).bundle.js',
    'packages/@(vue|react|react-composable-json-editor)/demo/**/*.ejs.html',
    'packages/core/demo/*.bundle.css'
  ],
  revisedFiles: [
  ],
  outputFiles: (file: string) => file.replace('.ejs', ''),
  json: false,
  ejsOptions: {
    rmWhitespace: true
  },
  sha: 256,
  customNewFileName: (filePath: string, fileString: string, md5String: string, baseName: string, extensionName: string) => baseName + '-' + md5String + extensionName,
  base: 'packages',
  fileSize: 'file-size.json'
}
