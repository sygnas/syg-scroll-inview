import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const packages = require('./package.json');

const paths = {
    root: '/',
    source: {
        root: './src/',
    },
    dist: {
        root: './dist/',
    },
};

const fileName = process.env.NODE_ENV !== 'production' ? 'scroll-inview' : 'scroll-inview.min';

const Configure = {
    input: `${paths.source.root}index.js`,
    output: [
      {
        file: `${paths.dist.root}${fileName}.js`,
        format: 'umd',
        name: packages.moduleName,
        sourcemap: true,
      }
    ],
    plugins: [
        babel({
          plugins: ['external-helpers'],
          externalHelpers: true,
          runtimeHelpers: true,
          exclude: 'node_modules/**'
        }),
        commonjs({
          include: 'node_modules/**'
        }),
        sourcemaps(),
        resolve(),
    ],
    external: [
        '@sygnas/throttle',
    ],
};

if (process.env.NODE_ENV === 'production') {
    Configure.plugins.push(uglify());
} else {
    Configure.output.push({
        file: `${paths.dist.root}${fileName}.es.js`,
        format: 'es',
    });
}

export default Configure;