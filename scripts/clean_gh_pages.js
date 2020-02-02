const fs = require('fs-extra')
const path = require('path')
const cwd = process.cwd()
const target = path.resolve(cwd, 'gh_pages')

fs.removeSync(target)