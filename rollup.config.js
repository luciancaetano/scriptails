import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import tsc from 'typescript';
import { cloneDeep } from 'lodash';
import pkg from './package.json';
import tsconfig from './tsconfig.json';

const tsconfigJson = cloneDeep(tsconfig);

export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            format: 'cjs',
            file: './dist/index.cjs.js',
        },
        {
            format: 'esm',
            file: './dist/index.esm.js',
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        'child_process',
        'fs',
    ],
    plugins: [
        typescript({
            typescript: tsc,
            tsconfigOverride: {
                compilerOptions: {
                    module: 'ESNext',
                },
            },
        }),
        json(),
        terser(), // minifies generated bundles

    ],
};
