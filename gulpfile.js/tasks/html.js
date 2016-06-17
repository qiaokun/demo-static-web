/**
 * @file 处理html文件任务
 *
 * @author CK
 */

var config       = require('../config/html');
var handleErrors = require('../lib/handleErrors');
var gulp         = require('gulp');

gulp.task('html', function () {
    return gulp.src(config.src).on('error', handleErrors).pipe(gulp.dest(config.dest));
});
