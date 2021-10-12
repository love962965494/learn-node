/**
 * 解压
 */
const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

const gunzip = zlib.createGunzip()

const inStream = fs.createReadStream(path.resolve(__dirname, './zip.txt.gz'))
const outStream = fs.createWriteStream(path.resolve(__dirname, './unzip.txt'))

inStream.pipe(gunzip).pipe(outStream)