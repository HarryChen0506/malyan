const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const ora = require('ora')
const symbols = require('log-symbols')
const chalk = require('chalk')
const { mkDir, rmDir, copyDir } = require('./shell/command')
const cwd = process.cwd()
const TEMP_DIR = 'gh_pages'
// const REPO_URL = 'github:HarryChen0506/malyan'
// const REPO_NAME = 'malyan'
// const REPO_DEST = path.resolve(cwd, TEMP_DIR, REPO_NAME)
const TARGET_DIR = 'docs'
const SOURCE_DIR = 'docs'

async function  buildDocs() {
  installModules()
  createHtml()
  afterBuild()
}

// 安装依赖
function installModules() {
  let spinner = ora('Installing...')
  spinner.start()
  // 命令行操作安装依赖
  shell.exec('cd docs && npm i')
  spinner.succeed()
  console.log(symbols.success, chalk.green('The docs package.json has installed dependence successfully!'))
}
// 生成HTML
function createHtml() {
  let spinner = ora('Crate HTML...')
  spinner.start()
  shell.exec('cd docs && npx gitbook build')
  spinner.succeed()
  console.log(symbols.success, chalk.green('The docs HTML has created successfully!'))
}

function afterBuild() {
  cleanOldDir()
  copyTargetDir()
  console.log(symbols.success, chalk.green('docs has built successfully!'))
}

// 清除旧目录
function cleanOldDir() {
  const target = path.resolve(cwd, TEMP_DIR, TARGET_DIR)
  if (fs.existsSync(target)) {
    rmDir(target)
    console.log(symbols.success, chalk.green('clean old gh-pages docs successfully!'))
  }
}
// 拷贝目标文件夹
function copyTargetDir() {
  const from = path.resolve(SOURCE_DIR, '_book/*')
  const to = path.resolve(cwd, TEMP_DIR, TARGET_DIR)
  if (!fs.existsSync(to)){
    mkDir(to)
  }
  copyDir(from, to)
}

// 移除缓存
// function removeTemp() {
//   const target = path.resolve(cwd, TEMP_DIR)
//   if (fs.existsSync(target)) {
//     rmDir(target)
//     console.log(symbols.success, chalk.green(`remove ${target} successfully!'`))
//   }
// }
module.exports.buildDocs = buildDocs
// module.exports.removeTemp = removeTemp