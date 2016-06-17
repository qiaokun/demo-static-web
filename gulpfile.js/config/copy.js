/**
 * @file 拷贝文件任务配置
 *
 * @author CK
 */

var config = require('./');

module.exports = {
    root: config.sourceDirectory,
    easyuiSrc: config.devModulesPath + '/easyui/**/*',
    easyuiDest: config.publicDirectory + '/easyui/',
    assetSrc: [config.root + '/asset/**/*', '!**/*.styl'],
    assetDest: config.publicDirectory + '/asset/'
};
