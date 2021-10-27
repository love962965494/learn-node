const fs = require('fs')
const path = require('path')

module.exports = function(dir, extname, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      return callback(err, [])
    }
    
    callback(null, files.filter(file => path.extname(file).slice(1) === extname))
  })
}