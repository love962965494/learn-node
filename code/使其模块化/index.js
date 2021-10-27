const func = require('./filter')

const [dir, extname] = process.argv.slice(2)
function callback(err, data) {
  if (err) {
    console.log(err)

    return
  }

  for (const item of data) {
    console.log(item)
  }
}

func(dir, extname, callback)