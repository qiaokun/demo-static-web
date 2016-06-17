/**
 * @file webpack 模块化构建正式发布版本任务
 *
 * @author CK
 */

var config  = require('../config/webpack')('production');
var logger  = require('../lib/compileLogger');
var gulp    = require('gulp');
var webpack = require('webpack');

gulp.task('webpack:production', function (callback) {
    webpack(config, function (err, stats) {
        logger(err, stats);
        callback();
    });
});
