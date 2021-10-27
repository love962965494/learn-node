const fs = require('fs/promises')
const path = require('path')

const [filePath, extname] = process.argv.slice(2)

fs.readdir(filePath).then(dirs => {
  for (const dir of dirs) {
    if (path.extname(dir).slice(1) === extname) {
      console.log(dir)
    }
  }
}).catch(err => {
  console.log('过滤器执行出错：', err.message)
})