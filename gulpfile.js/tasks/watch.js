/**
 * @file 本地开发监测文件变动任务
 *
 * @author CK
 */

var html     = require('../config/html');
var gulp     = require('gulp');
var watch    = require('gulp-watch');

gulp.task('watch', function () {
    watch(html.watch, function () {
        gulp.start('html');
    });
});
