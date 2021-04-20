import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import tsc from 'typescript';
import pkg from './package.json';

export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
            file: './dist/index.cjs.js',
        },
        {
            format: 'esm',
            sourcemap: true,
            exports: 'named',
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
            rollupCommonJSResolveHack: false,
            clean: true,
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
