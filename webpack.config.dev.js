/**
 * Created by junxie on 18/5/27.
 */
const {merge} = require('webpack-merge');
const base = require('./webpack.config.basic');

const path = require('path');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');


module.exports = merge(base, {
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 600, // 限流，每隔600ms 渲染
        ignored: /node_modules/,
    },
});
