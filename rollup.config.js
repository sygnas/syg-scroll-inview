import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from 'rollup-plugin-node-resolve';

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

let fileName,
    Configure;

fileName = process.env.NODE_ENV !== 'production' ? 'scroll-inview' : 'scroll-inview.min';

Configure = {
    entry: `${paths.source.root}index.js`,
    moduleName: packages.moduleName,
    moduleId: packages.moduleName,
    sourceMap: true,
    targets: [{
        dest: `${paths.dist.root}${fileName}.js`,
        format: 'umd',
    }],
    plugins: [
        babel(),
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
    Configure.targets.push({
        dest: `${paths.dist.root}${fileName}.es.js`,
        format: 'es',
    });
}

export default Configure;