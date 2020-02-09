const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'source-map',
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
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new extractTextWebpackPlugin({
            filename: 'static/css/[name].[contenthash].css'
        }),
        // 抽离第三方库
        /*new webpack.optimize.CommonsChunkPlugin({
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
        }),*/
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: Object.keys(baseWebpackConfig.entry)
        }),*/
        new cleanWebpackPlugin(['dist'])
    ]
});