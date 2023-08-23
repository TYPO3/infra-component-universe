import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: [
    'src/typo3-universe.ts'
  ],
  bundle: true,
  minify: true,
  format: 'esm',
  legalComments: 'none',
  target: ['es2020'],
  outfile: 'dist/typo3-universe.js',
}).catch(error => console.error(error))
