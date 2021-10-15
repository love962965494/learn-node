const fs = require('fs')

fs.readFile(process.argv[2], 'utf-8', function (err, data) {
  if (err) {
    console.log('异步读取文件出错：', err.message)
  }
  
  console.log(data.split('\n').length - 1) 
})