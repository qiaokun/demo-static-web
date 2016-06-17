/**
 * @file gulp 默认执行任务
 *
 * @author CK
 */

var gulp = require('gulp');

gulp.task('deploy', ['build:production']);
