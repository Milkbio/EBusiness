const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const proxy = require('./config/proxyConfig').proxyList;

const baseWebpackConfig = require('./webpack.config');

//  根据entry生成htmlWebpackPlugin配置
const generateHtmlWebpack = () => {
    const entries = Object.keys(baseWebpackConfig.entry);
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

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: 'cheap-module-eval-source-map',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        ...generateHtmlWebpack(),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
    ],
    optimization: {
        usedExports: true
    },
    devServer: {
        clientLogLevel: 'warning',
        inline: true,
        hot: true,
        compress: true,
        host: 'localhost',
        port: 8888,
        overlay: {warnings: false, errors: true},
        // quiet: true,
        stats: "errors-only",
        contentBase: './dist',
        proxy
    },
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                }
            }))
            resolve(devWebpackConfig);
        }
    })
})