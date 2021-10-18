const fs = require('fs')
const path = require('path')

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
  fs.writeFile(
    path.resolve(__dirname, './testWrite.txt'),
    '测试异步写入数据\n',
    {
      encoding: 'utf-8',
      flag: 'a',
    },
    function (err) {
      if (err) {
        console.log('异步写入文件出错：', err.message)
      }
      console.log('异步写入文件成功')
    }
  )
} catch (error) {
  console.log('异步写入文件出错：', error.message)
}

/**
 * 文件流写入
 */
try {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, './testWrite.txt'), {
    flags: 'a',
    encoding: 'utf-8',
  })

  writeStream.on('close', function () {
    console.log('文件流关闭')
  })

  writeStream.write('文件流写入内容1\n')
  writeStream.write('文件流写入内容2')

  writeStream.end('')
} catch (error) {
  console.log('文件流写入内容出错：', error.message)
}
