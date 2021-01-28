import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
/* eslint-disable  @typescript-eslint/no-var-requires */
// const packageJson = require('./package.json');

export default {
  input: {
    index: 'src/index.ts',
    icons: 'src/components/icons/index.tsx',
  },
  output: [
    {
      format: 'esm',
      dir: 'build',
    },
    {
      format: 'cjs',
      dir: 'build',
    },
  ],

  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};
