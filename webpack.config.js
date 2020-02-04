const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        index: './src/page/index/js/index.js'
    },
    output: {
        path: resolve('dist'),
        filename: "static/js/[name].js",
        publicPath: '/'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            '@': resolve('src'),
            'assets': resolve('src/assets'),
            'util': resolve('src/util'),
            'service': resolve('src/service'),
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
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    devtool: '#source-map'
}