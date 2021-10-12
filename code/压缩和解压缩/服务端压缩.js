/**
 * 服务端压缩，判断是否包含accept-encoding首部，且值为gzip
 */
const http = require('http')
const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

const server = http.createServer(function (req, res) {
  const acceptEncoding = req.headers['accept-encoding']
  let gzip

  if (acceptEncoding.indexOf('gzip') !== -1) {
    gzip = zlib.createGzip()

    res.writeHead(200, {
      'Content-Encoding': 'gzip'
    })

    fs.createReadStream(path.resolve(__dirname, './zip.html'), {
      encoding: 'utf-8'
    }).pipe(gzip).pipe(res)
  } else {
    fs.createReadStream(path.resolve(__dirname, './zip.html')).pipe(res)
  }
})

server.listen(3000)