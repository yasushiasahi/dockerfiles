const fs = require('fs')
const isDevelopment = process.env.NODE_ENV !== 'production'
const entrys = process.env.ENTRYS

if (isDevelopment) {
  process.exit()
}

for (const path of entrys.split('&&')) {
  if (path.endsWith('.scss')) {
    const jsFilePath = `dist/${path.split('.')[0]}.js`
    fs.unlinkSync(jsFilePath)
    console.log(`${jsFilePath}を削除しました。`)
  }
}
