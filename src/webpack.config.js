const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry : path.join(__dirname,'js/app/index.js'),
  output : {
    path : path.join(__dirname,'../public/js'),
    filename : 'index.js'
  }/*,
  modules:{
    // rules:[
    //   {
    //     test : '/\.less$/',
    //     use : [
    //       'style-loader',
    //       'css-loader',
    //       'less-loader'
    //     ]
    //   }
    // ],
    // resolve:{
    //   alias : {
    //     jquery : path.join(__dirname,'js/lib/jquery.js'),
    //     module : path.join(__dirname,'js/module'),
    //     less : path.join(__dirname,'less')
    //   }
    // },
    // plugins:[
    //   new webpack.ProvidePlugin({
    //     $ : 'jquery'
    //   })
    // ]
  }*/
}