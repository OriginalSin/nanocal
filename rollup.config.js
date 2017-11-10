import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'

const production = !process.env.ROLLUP_WATCH
const outputIndex = 8
const ranger = process.argv[outputIndex].includes('nanocal-ranger')
const min = process.argv[outputIndex].includes('.min')
const cssFileName = ranger ? 'nanocal-ranger' : 'nanocal'
const outputName = ranger ? 'NanocalRanger' : 'Nanocal'

export default {
  output: {
    sourcemap: !production,
    name: outputName
  },
  plugins: [
    resolve(),
    svelte({
      dev: !production, // enable run-time checks when not in production
      css: css => { css.write(`dist/${cssFileName}.min.css`) }
    }),
    production && min && minify({ comments: false })
  ]
}
