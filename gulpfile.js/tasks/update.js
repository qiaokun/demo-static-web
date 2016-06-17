/**
 * @file gulp 升级同步框架
 *
 * @author CK
 */

var config = require('../config/update');
var gitClone = require('../lib/gitClone');
var fs = require('fs');
var gulp = require('gulp');
var del = require('del');

gulp.task('update', function () {
    var cb = function () {
        fs.mkdirSync(config.tmp);

        gitClone(config.repository, config.tmp, null, function () {
            gulp.src(config.tmp + '/gulpfile.js/**/*.js')
                .pipe(gulp.dest('./gulpfile.js/'));

            var files = config.src.map(function (item) {
                return config.tmp + '/' + item;
            });
            gulp.src(files)
                .pipe(gulp.dest('.'));
        });
    };

    del([config.tmp], cb);
});
