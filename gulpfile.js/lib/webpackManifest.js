/**
 * @file webpack 插件，实现 md5 版本控制
 *
 * @author CK
 */

var util = require('./util');
var path = require('path');
var fs   = require('fs');

module.exports = function (publicPath, dest, filename) {
    filename = filename || 'rev-manifest.json';

    var now = new Date();

    return function () {
        this.plugin('done', function (stats) {
            stats = stats.toJson();
            var chunks = stats.assetsByChunkName;
            var manifest = {};
            for (var key in chunks) {
                if (chunks.hasOwnProperty(key)) {
                    var file = chunks[key];
                    if (file instanceof Array) {
                        file = file[0];
                    }
                    file += '?' + util.formatDate(now, 'yyyyMMddhhmm');
                    manifest[publicPath + key + '.js'] = publicPath + file;
                }
            }

            fs.writeFileSync(
                path.join(process.cwd(), dest, filename),
                JSON.stringify(manifest)
            );
        });
    };
};
