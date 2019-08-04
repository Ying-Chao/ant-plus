import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import pkg from './package.json';

const input = 'src/index.jsx';
const deps = Object.keys(pkg.peerDependencies);
const external = (id) => deps.includes(id) || id.includes('antd') || id.includes('@babel/runtime');
const plugins = (isEsm) => [
  babel({
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: isEsm ? 'es' : 'lib', style: 'css' }],
      ['@babel/plugin-transform-runtime', { useESModules: isEsm }],
    ],
    runtimeHelpers: true,
  }),
  sass({ insert: true }),
];

export default [
  { input, output: { file: pkg.main, format: 'cjs' }, external, plugins: plugins(false) },
  { input, output: { file: pkg.module, format: 'es' }, external, plugins: plugins(true) },
];
