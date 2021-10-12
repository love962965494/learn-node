/**
 * 服务端字符串压缩。采用zlib.gzipSync(str)
 */
const http = require('http')
const zlib = require('zlib')
const responseText = 'hello world'

const server = http.createServer(function (req, res) {
  const acceptEncoding = req.headers['accept-encoding']

  if (acceptEncoding.includes('gzip')) {
    res.writeHead(200, {
      'content-encoding': 'gzip'
    })

    res.end(zlib.gzipSync(responseText))
  } else {
    res.end(responseText)
  }
})

server.listen(3000)