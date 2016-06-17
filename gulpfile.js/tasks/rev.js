/**
 * @file 版本控制
 *
 * @author CK
 */

var config = require('../config');
var gulp = require('gulp');
var revReplace = require('gulp-rev-replace');

gulp.task('rev', function (cb) {
    var manifest = gulp.src(config.publicDirectory + '/rev-manifest.json');
    return gulp.src(config.publicDirectory + '/**/*.html')
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(config.publicDirectory));
});
