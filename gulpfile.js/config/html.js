/**
 * @file 拷贝单页面html文件任务配置
 *
 * @author CK
 */

var config = require('./');

module.exports = {
    watch: config.sourceDirectory + '/*.html',
    src: [config.sourceDirectory + '/*.html', '!**/{layouts,shared}/**'],
    dest: config.publicDirectory
};
