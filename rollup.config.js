import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import { terser } from 'rollup-plugin-terser'

const extensions = [".js", ".ts"]

export default [{
    input: ["src/typo3-universe.ts"],
    output: {
        compact: true,
        file: 'dist/typo3-universe.js',
        format: 'esm',
        name: 'universe',
    },
    plugins: [
        resolve({
            extensions: extensions,
        }),
        commonjs({}),
        babel({
            extensions: extensions,
            runtimeHelpers: true
        }),
        terser()
    ]
}];
