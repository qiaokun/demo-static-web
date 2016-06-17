/**
 * @file css 构建任务
 *
 * @author CK
 */

var config = require('../config/css');
var gulp   = require('gulp');
var rev    = require('gulp-rev');

gulp.task('css', function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest))
        .pipe(rev.manifest('dist/rev-manifest.json', {merge: true}))
        .pipe(gulp.dest(''));
});
