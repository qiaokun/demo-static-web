/**
 * @file webpack 模块化构建开发环境任务
 *
 * @author CK
 */

// 获取webpack打包配置
var config  = require('../config/webpack')('development');
// 公共日志输出
var logger  = require('../lib/compileLogger');

var gulp    = require('gulp');
var webpack = require('webpack');

gulp.task('webpack:development', function (callback) {
    webpack(config).watch(200, function (err, stats) {
        logger(err, stats);
        // On the initial compile, let gulp know the task is done
        callback();
    });
});
