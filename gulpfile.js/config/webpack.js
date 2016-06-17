/**
 * @file webpack 的任务配置，包括 webpack 的本地测试和打包上线
 *
 * @author CK
 */

// var fs             = require('fs');
var path            = require('path');
var paths           = require('./');
var publicPath      = '/js/';
var WebpackManifest = require('../lib/webpackManifest');
var webpack         = require('webpack');

// function getEntryPoint() {
//     var jsSrc = paths.sourceDirectory + '/main.js';

    // var entry = {
    //   page1: [jsSrc + 'page1.js'],
    //   page2: [jsSrc + 'page2.js']
    // };
    // var files = fs.readdirSync(jsSrc);
    // var entry = {};
    // var reg = /index\.js$/;

    // for (var i = 0; i < files.length; i++) {
    //     var file = files[i];
    //     if (reg.test(file)) {
    //         entry[file.replace(reg, '')] = [
    //             jsSrc + file
    //         ];
    //     }
    // }

    // files.filter(function(file) {
    //   return reg.test(file);
    // }).map(function(file){
    //   entry[file.replace(reg, '')] = [jsSrc + file];
    // })
//     return {main: jsSrc};
// }

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
                // {
                //     test: /\.js$/,
                //     loader: 'babel-loader?stage=1',
                //     exclude: /node_modules/
                //     // exclude: /(node_modules|easyui)/
                // },
                {test: /\.html$/, loader: 'html'},
                {test: /\.css$/, loader: 'style!css?minimize'},
                {test: /\.less$/, loader: 'style!css!less'},
                // {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
                {test: /\.(png|jpg|gif)/, loader: 'file-loader?name=../asset/img/[name].[ext]'}
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
