/*
 * @Author: labike 
 * @Date: 2018-03-09 14:07:52 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-07 16:04:27
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
/*"dist": "node_modules/.bin/webpack -p",*/
console.log(WEBPACK_ENV)

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//s.labike.com/admin/dist/',
        filename: 'js/app.js'
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component'),
            utils: path.resolve(__dirname, 'src/utils'),
            service: path.resolve(__dirname, 'src/service')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
              test: /\.(ttf|woff|eot|svg|otf|woff2)$/,
              use: [
                  {
                      loader: 'url-loader',
                      options: {
                          limit: 8192,
                          name: 'resource/[name].[ext]'
                      }
                  }
              ]
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        port: 8088,
        historyApiFallback: {
            index: '/dist/index.html'
        },
        proxy: {
            '/manage': {
                target: 'http://test.xxx.com',
                changeOrigin: true
            },
            '/user/logout.do': {
                target: 'http://test.xxx.com',
                changeOrigin: true
            }
        }
    },
};