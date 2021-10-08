## 理解node
Node.js是一个开源项目，用来帮助开发者编写关于网络、文件系统或者其它涉及到I/O操作的程序。它就是一个简单稳定的I/O平台，帮助你构建模块。

node一般主要用来编写下面两种类型的程序：
+ 使用网络协议（HTTP、TCP、UDP、DNS和SSL）的网络程序
+ 读写文件或者内存的程序

## 核心模块
+ 文件系统：fs
+ 网络：net(TCP)、http、dgram(UDP)
+ 异步解析DNS：dns
+ 操作系统信息：os
+ 分配二进制内存：buffer
+ 解析urls和路径：url、querystring、path

Node处理I/O通过回调(callback)、事件(events)、流(stream)和模块(modules)。

## 回调
回调是理解node最重要的部分。在node中，基本上所有地方都会用到回调。

回调是异步执行的函数，或者说是之后执行的函数。理解回调的关键就是，你不能确定一个异步操作什么时候完成，但是你可以确定操作完成的位置。

```js
var fs = require('fs') // require is a special function provided by node
var myNumber = undefined // we don't know what the number is yet since it is stored in a file

function addOne() {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents)
    myNumber++
  })
}

addOne()

console.log(myNumber) // logs out undefined -- this line gets run before readFile is done
```

## 事件
事件是一种常见的设计模式，更常见的叫法是观察者模式或者发布订阅模式。回调是一种一对一的关系，而事件是多对多的关系。

未使用事件编程：
```js
var chatClient = require('my-chat-client')

function onConnect() {
  // have the UI show we are connected
}

function onConnectionError(error) {
  // show error to the user
}

function onDisconnect() {
 // tell user that they have been disconnected
}

function onMessage(message) {
 // show the chat room message in the UI
}

chatClient.connect(
  'http://mychatserver.com',
  onConnect,
  onConnectionError,
  onDisconnect,
  onMessage
)
```

使用事件编程：
```js
var chatClient = require('my-chat-client').connect()

chatClient.on('connect', function() {
  // have the UI show we are connected
}) 

chatClient.on('connectionError', function() {
  // show error to the user
})

chatClient.on('disconnect', function() {
  // tell user that they have been disconnected
})

chatClient.on('message', function() {
  // show the chat room message in the UI
})
```