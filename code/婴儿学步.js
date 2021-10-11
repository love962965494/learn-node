function sum(args) {
  let sumNum = 0

  for (const num of args.slice(2)) {
    sumNum += Number(num)
  }

  console.log(sumNum)

  return sumNum
}

sum(process.argv)