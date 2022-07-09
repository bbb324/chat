/**
 * Created by junxie on 18/5/27.
 */
const {merge} = require('webpack-merge');
const base = require('./webpack.config.basic');

const { CleanPlugin } = require('webpack');

module.exports = merge(base, {
    mode: 'production',
    devtool: false,
    plugins: [new CleanPlugin]
});
