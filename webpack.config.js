const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');


function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        index: './src/page/index/index.js'
    },
    output: {
        path: resolve('dist'),
        filename: "static/js/[name].js",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            '@': resolve('src'),
            'assets': resolve('src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node-modules/',
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
                }]
            },
            {
                test: /\.(css|less)$/,
                loader: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
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
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: 'src/view/index.html',
            inject: true,
            minify: {
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new cleanWebpackPlugin(['dist']),
        new extractTextWebpackPlugin({
            filename: 'static/css/[name].[contenthash].css'
        })
    ]
}