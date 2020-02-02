// const path = require('path')
const shell = require('shelljs')

// 公共函数
function mkFile(content, dist) {
  shell.echo(content).to(dist)
}
function touch(file) {
  shell.touch(file)
}
// 创建文件夹 如'/temp'
function mkDir(path) {
  shell.mkdir('-p', path)
}
// 删除文件夹 如'/temp/*'
function rmDir(path) {
  shell.rm('-rf', path)
}
// 拷贝文件夹
function copyDir(from, to) {
  //将`stuff/`中所有内容拷贝至`out/Release`目录
  // shell.cp('-R', 'stuff/', 'out/Release')
  shell.cp('-R', from, to)
}

module.exports.touch = touch
module.exports.mkFile = mkFile
module.exports.mkDir = mkDir
module.exports.rmDir = rmDir
module.exports.copyDir = copyDir