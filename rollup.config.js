
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

import baseConfig from './rollup.config.base.js'
import { name, version, author, homepage } from './package.json'


// banner
const banner =
  `${'/*!\n' + ' * '}${name} v${version}\n` +
  ` * ${homepage}\n` +
  ` * (c) 2019-${new Date().getFullYear()} ${author}\n` +
  ' * MIT License.\n' +
  ' */'

// 支持输出 []
export default [
  // .js, .cjs.js, .esm.js
  {
    ...baseConfig,
    output: [
      // umd development version with sourcemap
      {
        file: `dist/${name}.js`,
        format: 'umd',
        name: 'Malyan',
        exports: 'named',
        banner,
        sourcemap: true
      },
      // cjs and esm version
      {
        file: `dist/${name}.cjs.js`,
        format: 'cjs',
        exports: 'named',
        banner
      },
      // cjs and esm version
      {
        file: `dist/${name}.esm.js`,
        format: 'es',
        exports: 'named',
        banner
      }
    ],
    plugins: [...baseConfig.plugins, filesize()]
  },
  // .min.js
  {
    ...baseConfig,
    input: 'src/index.unpkg.js',
    output: [
      // umd with compress version
      {
        file: `dist/${name}.min.js`,
        format: 'umd',
        name: 'Malyan',
        exports: 'default',
        banner
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      uglify(
        {
          compress: {
            drop_console: true
          }
        },
        minify
      ),
      filesize()
    ]
  }
]