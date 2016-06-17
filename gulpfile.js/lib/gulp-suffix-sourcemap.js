/**
 * @file gulp 插件，实现加入sourceMap路径
 *
 * @author CK
 */

var through       = require('through2');
var gutil         = require('gulp-util');
var PluginError   = gutil.PluginError;

// 常量
const PLUGIN_NAME = 'gulp-suffix-souremap';

// 插件级别的函数（处理文件）
function gulpSuffixSourceMap() {

    // 创建一个 stream 通道，以让每个文件通过
    var stream = through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            var fileNmae = file.path.replace(file.base, '');
            var prefixText = new Buffer('\n\r//# sourceMappingURL=' + fileNmae + '.map');

            file.contents = Buffer.concat([file.contents, prefixText]);
        }

        // 确保文件进入下一个 gulp 插件
        this.push(file);

        // 告诉 stream 引擎，我们已经处理完了这个文件
        cb();
    });

    // 返回文件 stream
    return stream;
}

// 导出插件主函数
module.exports = gulpSuffixSourceMap;
