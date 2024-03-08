// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    devServer: {
        static: {
            directory: path.join(__dirname),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dest'),
        publicPath: '/dest/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
