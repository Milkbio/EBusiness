const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const entry = () => {
    const directory = path.resolve(__dirname, './src/page');
    const files = fs.readdirSync(directory);

    const entries = {};
    files.forEach(file => {
        entries[file] = `./src/page/${file}/index.js`;
    });
    return entries;
};

//  根据entry生成htmlWebpackPlugin配置
const generateHtmlWebpack = () => {
    const entries = Object.keys(entry());
    const arr = entries.map(entry => {
        return new HtmlWebpackPlugin({
            template: `src/view/${entry}.html`,
            filename: `view/${entry}.html`,
            inject: true,
            hash: true,
            chunks: ['manifest', 'vendor', 'common', entry]
        })
    });
    return arr
}

module.exports = {
    entry: entry(),
    output: {
        path: resolve('dist'),
        filename: "static/js/[name].js",
        publicPath: '/'
    },
    externals: {
        'jquery': 'window.jQuery'
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
            'api': resolve('src/api'),
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
    plugins: [
        ...generateHtmlWebpack()
    ],
    devtool: '#source-map'
}