/**
 * @file webpack 的任务配置，包括 webpack 的本地测试和打包上线
 *
 * @author CK
 */

var path            = require('path');
var paths           = require('./');
var publicPath      = '/js/';
var WebpackManifest = require('../lib/webpackManifest');
var webpack         = require('webpack');

module.exports = function (env) {
    var jsDest = paths.publicDirectory + '/js/';

    var webpackConfig = {
        entry: {
            index: paths.sourceDirectory + '/index.js'
        },

        output: {
            path: jsDest,
            publicPath: './js/',
            filename: '[name].js'
            // filename: env === 'production' ? '[name]-[hash].js' : '[name].js'
        },

        plugins: [
            // new webpack.ProvidePlugin({
            //     '$': 'jquery',
            //     'jQuery': 'jquery',
            //     'window.jQuery': 'jquery'
            // })
        ],

        resolve: {
            extensions: ['', '.js'],
            modulesDirectories: ['web_modules', 'node_modules', 'node_modules/VueFrame', 'src/app'],
            alias: {
                vue: path.join(__dirname, '../../node_modules/vue')
            }
        },

        module: {
            loaders: [
                {test: /\.html$/, loader: 'html'},
                {test: /\.css$/, loader: 'style!css?minimize'},
                {test: /\.less$/, loader: 'style!css!less'},
                {test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=../asset/img/[name].[ext]'}
            ]
        }

    };

    // if (env !== 'test') {
    //     // Factor out common dependencies into a shared.js
    //     webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    //         name: 'shared',
    //         filename: '[name].js',

    //     }));
    // }

    if (env === 'development') {
        // webpackConfig.devtool = 'sourcemap';
        webpack.debug = true;
    }

    if (env === 'production') {
        webpackConfig.devtool = 'sourcemap';
        webpackConfig.plugins.push(
            new WebpackManifest(publicPath, 'dist'),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin()
        );
    }

    return webpackConfig;
};
