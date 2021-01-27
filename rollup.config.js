import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import multiInput from 'rollup-plugin-multi-input';
/* eslint-disable  @typescript-eslint/no-var-requires */
// const packageJson = require('./package.json');

export default {
  input: ['src/index.ts', 'src/components/icons/index.tsx'],
  output: [
    {
      // file: packageJson.main,
      format: 'cjs',
      sourcemap: false,
      dir: 'build',
      exports: 'named',
    },
    {
      // file: packageJson.module,
      format: 'esm',
      sourcemap: false,
      dir: 'build',
      exports: 'named',
    },
  ],
  // preserveModules: true,
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    multiInput(),
  ],
};
