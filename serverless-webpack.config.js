const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    node: false,
    devtool: 'nosources-source-map',
    externals: [nodeExternals()],
    optimization: {
        // minimize uglifies the code. It will be hard to trace errors so we skip it.
        minimize: false
    },
    performance: {
        // Turn off size warnings for entry points
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: true
                }
            }
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
        filename: '[name].js'
    }
};
