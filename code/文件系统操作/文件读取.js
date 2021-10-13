const fs = require('fs')
const path = require('path')

/**
 * 同步读取
 */
try {
  const data1 = fs.readFileSync(path.resolve(__dirname, './test.txt'))
  console.log('同步读取文件内容：', data1.toString())
} catch (error) {
  console.log('同步读取文件出错：', error.message)
}

/**
 * 异步读取
 */
try {
  fs.readFile(path.resolve(__dirname, './test.txt'), 'utf8', function(err, data) {
    if (err) {
      console.log('异步读取文件出错：', err.message)

      return
    }

    console.log('异步读取文件内容：', data)
  })
} catch (error) {
  console.log('异步读取文件出错：', error.message)
}

/**
 * 通过文件流读取，适合读取大文件
 */
try {
  const readStream = fs.createReadStream(path.resolve(__dirname, './test.txt'), 'utf-8')

  readStream.on('data', function (chunk) {
    console.log('文件流读取数据：', chunk)
  }).on('error', function (err) {
    console.log('文件流读取出错：', err.message)
  }).on('end', function () {
    console.log('文件流读取数据完毕')
  }).on('close', function () {
    console.log('文件流读取关闭')
  })
} catch (error) {
  console.log('文件流读取数据出错：', error.message)
}