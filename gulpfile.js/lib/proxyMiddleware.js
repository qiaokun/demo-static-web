/**
 * @file 本地和远程数据模拟模块
 *
 * @author CK
 */

var url       = require('url');
var gutil     = require('gulp-util');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {
    res.end('Something went wrong. And we are reporting a custom error message.');
});

module.exports = function *(next) {
    this.respond = false;
    gutil.log('URL:', this.req.url);

    var location = url.parse(this.req.url);
    proxy.web(this.req, this.res, {
        target: location.protocol + '//' + location.host
    });
};
