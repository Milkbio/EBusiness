const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                loader: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                })
            }
        ]
    },
    plugins: [
        new extractTextWebpackPlugin({
            filename: 'static/css/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: 'src/view/index.html',
            inject: true,
            minify: {
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new cleanWebpackPlugin(['dist'])
    ]
});