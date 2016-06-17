/**
 * @file server 任务配置
 * @desc 注意关键变更配置：
 *       1、mockLocal 是否使用本地模拟数据
 *       2、mockRemote 和 remote 配置是模拟远程数据接口时使用，包括鉴权操作
 *
 * @author CK
 */

var config = require('./');

module.exports = {
    root: config.publicDirectory,
    port: process.env.PORT || 5000,
    mockRoot: config.root,
    // 本地模拟数据和远程服务器数据切换
    mockLocal: 1,
    remote: {
        path: 'http://crm.nuomi.com:80/',
        headers: {
            cookie: 'JSESSIONID=044fd345-c781-40af-b275-8312b70a4f44; acl_name=nuomiadmin%40baidu.com; acl_version=2614615869929315813; acl_token=968573DFDC8ABCA3DDC84F7824E3FC85; acl_platform=acl; is4newSSO=true; acl_ticket=ED94B80DE80195272C5695FF2B457E4E'
        }
    },
    logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
    staticOptions: {
        extensions: ['html', 'js'],
        maxAge: '31556926',
        gzip: true
    }
};
