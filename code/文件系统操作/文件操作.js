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
    .readdir(path.resolve(__dirname, '../文件系统操作'))
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

/**
 * 获取文件状态
 */
const stat = async () => fs.stat(path.resolve(__dirname, './hello/rename.txt')).then(data => {
  console.log('文件状态：', data)
}).catch(err => {
  console.log('获取文件状态出错：', err.message)
})

/**
 * 修改文件权限
 * 7: 可读、可写和可执行
 * 6: 可读、可写
 * 5: 可读、可执行
 * 4: 只读
 * 3: 可写和可执行
 * 2: 只写
 * 1: 只可执行
 * 0: 无权限
 */
const chmod = async () => fs.chmod(path.resolve(__dirname, './hello/rename.txt'), 7).then(() => {
  console.log('修改文件权限成功')
}).catch(err => {
  console.log('修改文件权限失败：', err.message)
})

/**
 * 复制文件夹
 */
const copyFile = async () => fs.copyFile(path.resolve(__dirname, './hello/index.txt'), path.resolve(__dirname, './hello/copy.txt')).then(() => {
  console.log('复制文件夹成功')
}).catch(err => {
  console.log("复制文件夹失败：", err.message)
})

async function main() {
  // 创建文件夹
  await mkdir()

  // 创建文件
  await createFile()

  // 复制文件
  await copyFile()

  // 监听文件操作
  watch()

  // 遍历文件夹
  await readdir()

  // 重命名文件
  await renameFile()

  // 获取文件状态
  await stat()

  // 修改文件权限
  await chmod()

  // 删除文件
  await removeFile()

  // 删除文件夹
  await rmdir()
}

main()
