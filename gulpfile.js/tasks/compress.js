/**
 * @file 压缩JS代码
 *
 * @author CK
 *
 * webpack 插件UglifyJsPlugin压缩代码时，任务被卡死
 */

var config = require('../config');
var suffixSouremap = require('../lib/gulp-suffix-sourcemap');
var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('compress', function () {
    return gulp.src(config.publicDirectory + '/js/*.js')
        .pipe(uglify())
        .pipe(suffixSouremap())
        .pipe(gulp.dest(config.publicDirectory + '/js/'));
});
