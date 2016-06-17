/**
 * @file 本地和远程数据模拟模块
 *
 * @author CK
 */

var config    = require('../config/server');
var index     = require('../config');
var util      = require('./util');

var fs        = require('fs');
var gutil     = require('gulp-util');
var _         = require('lodash');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

var base = config.remote.path;


proxy.on('error', function (err, req, res) {
    gutil.log('error:', res.statusCode);
    res.writeHead(res.statusCode || 500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

exports.mockRemote = function *(next) {
    if (this.req.headers['x-requested-with'] !== 'XMLHttpRequest'
        || /\.html$/g.test(this.req.url)) {
        return yield next;
    }

    // hack技巧，不使用koa的reponse，使用原生的
    this.respond = false;
    gutil.log('URL:', base + this.req.url);

    this.req.headers = _.assign(this.req.headers, config.remote.headers);

    proxy.web(this.req, this.res, {
        target: base
    });
};

exports.mockLocal = function *(next) {
    if (/\.html$/g.test(this.req.url)) {
        return yield next;
    }

    var path = this.req.url.split('?')[0];
    var reg = /http:\/\/(localhost|127\.0\.0\.1)(:\d+)*(\/.+)/;
    var result = path.match(reg);

    if (result && result.length > 0) {
        path = result[3];
    }
    path = path[0] === '/' ? path : '/' + path;
    if (index.basePath && path.indexOf('/' + index.basePath + '/') === 0) {
        path = path.substr(index.basePath.length + 1);
    }
    var base = config.mockRoot + '/mock/' + this.req.method + path;

    if (fs.existsSync(base)) {
        var stat = fs.lstatSync(base);
        if (!stat.isDirectory()) {
            gutil.log('本地模拟数据:', base);
            this.body = fs.readFileSync(base, {encoding: 'utf8'});
        } else if (fs.existsSync(base + '/index.json')) {
            gutil.log('本地模拟数据:', base + '/index.json');
            this.body = fs.readFileSync(base + '/index.json', {encoding: 'utf8'});
        } else if (fs.existsSync(base + '/index.js')) {
            gutil.log('本地模拟数据:', base + '/index.js');
            var param = this.req.method.toUpperCase() === 'POST'
                    ? this.request.body : util.parseParam(this.req.url);
            this.body = require(base + '/index.js')(param || {}, this.req);
            delete require.cache[require.resolve(base + '/index.js')];
        } else {
        	  gutil.log('本地模拟数据:', base);
            yield next;
        }
    }
    else {
        yield next;
    }
};
