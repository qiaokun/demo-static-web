/**
 * @file 项目迁移，兼容旧文件
 *
 * @author CK
 */

var config       = require('../config/migrate');
var handleErrors = require('../lib/handleErrors');
var gulp         = require('gulp');

gulp.task('migrate', function () {
    return gulp.src(config.src)
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest));
});
