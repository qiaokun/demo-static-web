/**
 * @file css输出任务配置文件
 *
 * @author CK
 */

var config = require('./');

module.exports = {
    src: config.root + '/asset/*.styl',
    dest: config.publicDirectory + '/css/'
};
