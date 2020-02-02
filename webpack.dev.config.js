const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const baseWebpackConfig = require('./webpack.config');

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: 'src/view/index.html',
            inject: true
        }),
    ],
    devServer: {
        clientLogLevel: 'warning',
        inline: true,
        hot: true,
        compress: true,
        host: 'localhost',
        port: '8888',
        overlay: {warnings: false, errors: true},
        publicPath: '/',
        quiet: true,
        stats: "errors-only"
    },
});

module.exports = devWebpackConfig;