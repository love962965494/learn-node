const fs = require('fs')
// const path = require('path')

const buffer = fs.readFileSync(process.argv[2])
const str = buffer.toString()

console.log(str.split('\n').length - 1)