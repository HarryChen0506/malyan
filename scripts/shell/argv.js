const yargs = require('yargs')
const example = `
  保存: $ node ./demo.js -s
  命名: $ node ./demo.js -n hello
`
const argv = yargs
  .option('name', {
    alias: 'n',
    describe: '名称',
    type: 'string'
  })
  .option('save', {
    alias: 's',
    describe: '保存',
    type: 'boolean'
  })
  .option('help', {
    alias: 'h',
    describe: '帮助',
  })
  .help('info')
  .help('help')
  .alias('h', 'help')
  .usage('Usage: node [options]')
  .example(example)
  .epilog('copyright@Harry')
  .argv

module.exports = argv