const { merge} = require('webpack-merge');
const common = require('./webpack.config.js');

const prodConfig = merge(common, {
  mode: 'production',  
  performance: {
      hints: false
  }
});

module.exports = prodConfig;