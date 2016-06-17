/**
 * @file 项目迁移，拷贝旧文件任务配置
 *
 * @author CK
 */

var config = require('./');

module.exports = {
    src: config.root + '/old/**/*',
    dest: config.publicDirectory
};
