/**
 * @file 拷贝文件任务
 *
 * @author CK
 */

var config       = require('../config/copy');
var gulp         = require('gulp');

gulp.task('copy', function () {
    return gulp.src(config.easyuiSrc).pipe(gulp.dest(config.easyuiDest));
});
