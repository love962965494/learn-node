const http = require('http')

const [url] = process.argv.slice(2)

http.get(url, function(response) {
  let str = ''
  response.setEncoding('utf-8')
  response.on('data', function(data) {
    str += data
  })
  response.on('error', function(err) {
    console.error(err.message)
  })
  response.on('end', function() {
    console.log(str.length)
    console.log(str)
  })
})