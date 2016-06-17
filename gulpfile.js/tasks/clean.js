/**
 * @file 构建之前清除项目
 *
 * @author CK
 */

var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

gulp.task('clean', function (cb) {
    del([config.publicDirectory], cb);
});
