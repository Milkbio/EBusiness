const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ],
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        inline: true,
        compress: true,
        host: 'localhost',
        port: '8888',
        overlay: {warnings: false, errors: true},
        publicPath: '/',
        quiet: true,
        stats: "errors-only",
        contentBase: path.resolve(__dirname, 'dist/view')
    },
});