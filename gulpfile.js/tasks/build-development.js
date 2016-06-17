/**
 * @file 构建开发环境的项目
 *
 * @author CK
 */

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function (cb) {
    gulpSequence('clean', ['copy', 'html', 'css', 'migrate'], 'webpack:development', 'watch', cb);
});
