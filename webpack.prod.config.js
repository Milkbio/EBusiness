const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new cleanWebpackPlugin(['dist'])
    ]
});