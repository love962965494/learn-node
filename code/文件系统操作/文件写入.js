const fs = require('fs')
const path = require('path')
const os = require('os')

/**
 * 同步写入
 */
try {
  fs.writeFileSync(path.resolve(__dirname, './testWrite.txt'), '测试同步写入数据\n', 'utf-8')
  console.log('同步写入文件成功')
} catch (error) {
  console.log('同步写入文件出错：', error.message)
}

/**
 * 异步写入
 */
try {
  fs.appendFile(path.resolve(__dirname, './testWrite.txt'), '测试异步写入数据\n' + os.EOL, 'utf-8', function (err) {
    if (err) {
      console.log('异步写入文件出错：', err.message)
    }
    console.log('异步写入文件成功')
  })
} catch (error) {
  console.log('异步写入文件出错：', error.message)
}

/**
 * 文件流写入
 */
try {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, './testWrite.txt'), {
    start: 2000,
    encoding: 'utf-8'
  })

  writeStream.on('close', function () {
    console.log('文件流关闭')
  })

  writeStream.write('文件流写入内容1')
  writeStream.write('文件流写入内容2')

  writeStream.end('')
} catch (error) {
  console.log('文件流写入内容出错：', error.message)
}