const http = require('http')

const [url] = process.argv.slice(2)

http.get(url, function (response) {
  response.setEncoding('utf-8')
  response.on('data', function (data) {
    console.log(data)
  })
  response.on('error', function(err) {
    console.log('请求数据出错：', err.message)
  })
})
