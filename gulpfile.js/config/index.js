/**
 * @file 全局通用任务配置
 *
 * @author CK
 */

var path = require('path');

var config = {};

var base = path.join(__dirname, '../../');

config.basePath = 'demo';
config.distPath = 'dist';
config.publicDirectory = base + config.distPath + '/' + config.basePath;
config.sourceDirectory = base + 'src/app';
config.root = base + 'src';
config.devModulesPath = base + 'node_modules';

module.exports = config;
