const { merge} = require('webpack-merge');
const common = require('./webpack.config.js');

const devConfig = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        hot: true
    }
});

module.exports = devConfig;