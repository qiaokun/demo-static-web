/**
 * @file webpack 模块化构建开发环境任务
 *
 * @author CK
 */

var config  = require('../config/webpack')('development');
var logger  = require('../lib/compileLogger');
var gulp    = require('gulp');
var webpack = require('webpack');

gulp.task('webpack:development', function (callback) {
    var built = false;

    webpack(config).watch(200, function (err, stats) {
        logger(err, stats);
        // On the initial compile, let gulp know the task is done
        if (!built) {
            built = true;
            callback();
        }
    });
});
