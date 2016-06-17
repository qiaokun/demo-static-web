/**
 * @file 本地开发环境启动服务任务
 *
 * @author CK
 */

var config      = require('../config/server');
var mock        = require('../lib/mockMiddleware');
var proxy       = require('../lib/proxyMiddleware');
var index       = require('../config');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var koa         = require('koa');
var body        = require('koa-bodyparser');
var staticCache = require('koa-static');
var app         = koa();

gulp.task('server', ['build:development'], function () {
    var url = 'http://localhost:' + config.port + '/' + index.basePath;

    app.use(staticCache(config.root, config.staticOptions));

    app.use(body());
    app.use(config.mockLocal ? mock.mockLocal : mock.mockRemote);

    // app.use(proxy);

    app.listen(config.port);

    gutil.log('production server started on ' + gutil.colors.green(url));
});
