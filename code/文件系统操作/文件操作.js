const fs = require('fs/promises')
const path = require('path')

const ac = new AbortController()

/**
 * 创建文件夹
 */
const mkdir = async () =>
  fs.opendir(path.resolve(__dirname, './hello')).catch((err) => {
    console.log('打开文件夹失败: ', err.message)
    fs.mkdir(path.resolve(__dirname, './hello'))
      .then(() => {
        console.log('创建目录成功')
      })
      .catch((err) => {
        console.log('创建目录出错：', err.message)
      })
  })

/**
 * 创建文件
 */
const createFile = async () =>
  fs
    .writeFile(path.resolve(__dirname, './hello/index.txt'), '测试创建文件')
    .then(() => {
      console.log('创建文件成功')
    })
    .catch((err) => {
      console.log('打开文件出错：', err.message)
    })

/**
 * 遍历文件
 */
const readdir = async () =>
  fs
    .readdir(path.resolve(__dirname, './hello'))
    .then((data) => {
      for (const item of data) {
        console.log('遍历文件内容：', item)
      }
    })
    .catch((err) => {
      console.log('遍历文件出错：', err.message)
    })

/**
 * 重命名文件
 */
const renameFile = async () =>
  fs
    .rename(path.resolve(__dirname, './hello/index.txt'), path.resolve(__dirname, './hello/rename.txt'))
    .then(() => {
      console.log('重命名文件成功')
    })
    .catch((err) => {
      console.log('重命名文件失败：', err.message)
    })

/**
 * 删除文件
 */
const removeFile = async () =>
  fs
    .rm(path.resolve(__dirname, './hello/rename.txt'))
    .then(() => {
      console.log('删除文件成功')
    })
    .catch((err) => {
      console.log('删除文件出错：', err.message)
    })

/**
 * 删除文件夹
 */
const rmdir = async () =>
  fs
    .rmdir(path.resolve(__dirname, './hello'))
    .then(() => {
      console.log('删除文件夹成功')
      ac.abort()
    })
    .catch((err) => {
      console.log('删除文件夹出错：', err.message)
    })
  
/**
 * 监听文件
 */
const watch = async () => {
  const watcher = fs.watch(path.resolve(__dirname, './hello/index.txt'))

  for await (const item of watcher) {
    console.log('监听文件事件：', item)
  }
}

async function main() {
  // 创建文件夹
  await mkdir()

  // 创建文件
  await createFile()

  watch()

  // 遍历文件夹
  await readdir()

  // 重命名文件
  await renameFile()

  // 删除文件
  await removeFile()

  // 删除文件夹
  await rmdir()
}

main()
