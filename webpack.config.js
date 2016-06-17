/**
 * @file webpack 基本配置文件
 *
 * @author CK
 */

var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/app/index.js'
    },

    output: {
        path: './dist/js/',
        publicPath: '/js/',
        filename: '[name].js'
    },

    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['web_modules', 'node_modules', 'node_modules/VueFrame', 'src/app'],
        alias: {
            vue: path.join(__dirname, './node_modules/vue')
        }
    },

    module: {
        loaders: [
            {test: /\.html$/, loader: 'html'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.(png|jpg|gif)$/i, loader: 'file-loader?name=../img/[name].[ext]'}
        ]
    }
};
