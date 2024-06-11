import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.min.js',
      format: 'iife',
      sourcemap: true
    },
    {
      file: 'dist/index.min.mjs',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [commonjs(), resolve(), terser()]
};
