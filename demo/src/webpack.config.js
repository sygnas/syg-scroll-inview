const modules_path = '/Users/dada/.nodebrew/node/v6.10.0/lib/node_modules/';
const webpack = require(`${modules_path}webpack`);

const webpack_config = {
    entry: ['./demo.js'],
    output: {
        path: `${__dirname}/../`,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                // Babel
                test: /\.js$/,
                // exclude: /node_modules/,
                use: `${modules_path}babel-loader`
            }
        ]
    }
};

module.exports = webpack_config;
