/**
 * 压缩
 */
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const gzip = zlib.createGzip()

const inStream = fs.createReadStream(path.resolve(__dirname, './zip.txt'))
const outStream = fs.createWriteStream(path.resolve(__dirname, './zip.txt.gz'))

inStream.pipe(gzip).pipe(outStream)
