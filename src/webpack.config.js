var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, "js/app/index.js"),
    output: {
        path: path.join(__dirname, "../public"),
        filename: "js/index.js"
    },
    module: {
        rules: [

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader"]
                    }) //把 css 抽离出来生成一个文件
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "less-loader"]
                    }) //把 css 抽离出来生成一个文件
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                        {
                            loader: 'file-loader',
                            options: {
                            name: 'img/[name].[ext]',
                            publicPath: '../'
                            }
                        }
                ]
            },
            {
                test:/\.(woff|woff2|ttf|otf|eot|svg)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                          name: 'fonts/[name].[ext]',
                          publicPath: '../'
                        }
                    }
                ]
            }
    ]
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, "js/lib/jquery.js"),
            module: path.join(__dirname, "js/module"),
            less: path.join(__dirname, "less"),
            assets:path.join(__dirname,'../assets')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer(),
                ]
            }
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
    ]
};