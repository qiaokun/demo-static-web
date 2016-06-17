/**
 * @file DP监控通用类库
 *
 * 需要首先按照DP监控的要求在模板中配置监控脚本
 * @author 许晨晖 xu.chenhui@live.com
 * @date 2014/12/29 22:20
 *
 * @example:
 * //初始化
 * var dp = require('common:util/dp.js');
 * var yourmodel = {
 *     init: function(){
 *         //DP监控初始化
 *         dp.init(dp.DP_GLOBAL_CODE , '616_xxx');
 *     }
 * };
 *
 * //Ajax测速
 * //测速名称统一以z_xxx_query为规范
 * //可以使用makeSpeedName创建该名称，如
 * var queryName = dp.makeSpeedName('test');
 * //queryName = z_test_query
 *
 * var testAjax = function(){
 *     $.post(..., {
 *         beforeSend:function(){
 *              dp.startCustomSpeed(queryName);
 *         }
 *     })
 *     .done(function(){
 *         dp.stopCustomSpeed(queryName);
 *     })
 *     .fail(function(){
 *         dp.terminalCustomSpeed(queryName);
 *     });
 * }
 * testAjax();
 *
 * //自定义计数
 * //名称统一以z_xxx_count为规范
 * //可以使用makeCountName创建该名称，如
 * var countName = dp.makeCountName('test');
 *
 * //增加一次计数
 * dp.customCount(countName);
 *
 *
 * //绑定Backbone collection
 * var collection = new Backbone.collection(...);
 * dp.dpBindCollection(collection, queryName);
 *
 */
/* globals alog */

'use strict';

var DP_GLOBAL_CODE = '616';
/** 默认的DP配置 */
var defaultOptions = {
    monkey_page: '', // 如果页面已经有hunter平台的monkey，则为monkey的pageId, 否侧无需该字段
    speed_page: '', // 如果页面已经有webspeed平台的性能监控，则为性能的page_id,否侧无需该字段

    // 性能-------------------------------------------------------------------------------------------------------
    speed: {
        sample: '1' // 抽样率, 0~1，建议使采样的pv控制在100万以内，必须要设定，否则统计不会生效
            // custom_metrics: ['c_item1','p_item3']  //自定义的性能指标，自动上报，只有这些指标都统计完毕之后数据才会发送
            // special_pages: [{id:34, sample:1}]  // 特殊页面，和老的性能配置一致
    },

    // 访问和点击-------------------------------------------------------------------------------------------------
    monkey: {
        sample: '1' // 抽样率, 0~1  建议使采样的pv控制在50万以内，必须要设定，否则统计不会生效
            // hid: ''       // 兼容hunter的monkey，monkey实验的ID
            // pageflag: ''  // 个别特殊产品线使用hunter的monkey的pageflag
    },

    // js异常，除window.onerror外，配合FIS插件还可以自动加try/catch监控，见下面的“高级功能”部分-----------------------
    exception: {
        sample: '1' // 抽样率, 0~1  建议使采样的pv控制在50万以内，必须要设定，否则统计不会生效
    },

    // 浏览器新特性(H5/CSS3)--------------------------------------------------------------------------------------
    feature: {
        sample: '1' // 抽样率, 0~1  建议使采样的pv控制在50万以内，必须要设定，否则统计不会生效
    },
    cus: {
        sample: '1' // 抽样率, 0~1  必须要设定，否则统计不会生效
    },

    // 跨站资源监控-----------------------------------------------------------------------------------------------
    csp: {
        'sample': '1', // 抽样率, 0~1  建议使采样的pv控制在100万以内，必须要设定，否则统计不会生效

        // 默认的跨站策略, 产品线可以根据自己的实际情况进行修改,Warn表示匹配的资源被算作跨域资源
        'default-src': [ // 糯米域不为跨域
            {
                match: '*.nuomi.com',
                target: 'Accept'
            }, {
                match: '*.baidu.com',
                target: 'Accept,Warn'
            }, {
                match: /^(127|172|192|10)(\.\d+){3}$/,
                target: 'Accept'
            }, {
                match: '*',
                target: 'Accept,Warn'
            }
        ]
    }
};

/**
 * 记录自定义速度的时间
 */
var speedRecord = {};

/**
 * 初始化DP监控
 *
 * @param {string} product 监控的产品名称
 * @param {string} page 监控的产品页面名称
 * @param {string} options 附加参数
 */
var initDp = function (product, page, options) {
    if (!product) {
        product = DP_GLOBAL_CODE;
    }
    if (!page) {
        return;
    }

    options = $.extend(true, {
        product: product + '', // 必须, DP平台产品线id
        page: page + '' // 必须, DP平台页面id
    }, defaultOptions, options);

    window.alogObjectConfig = options;
    // pc和mobile端会稍有不同，必须严格按照该文档来部署，该段代码必须放在上面的window.alogObjectConfig配置之后
    void function(a,b,c,d,e,f){function g(b){a.attachEvent?a.attachEvent("onload",b,!1):a.addEventListener&&a.addEventListener("load",b)}function h(a,c,d){d=d||15;var e=new Date;e.setTime((new Date).getTime()+1e3*d),b.cookie=a+"="+escape(c)+";path=/;expires="+e.toGMTString()}function i(a){var c=b.cookie.match(new RegExp("(^| )"+a+"=([^;]*)(;|$)"));return null!=c?unescape(c[2]):null}function j(){var a=i("PMS_JT");if(a){h("PMS_JT","",-1);try{a=a.match(/{["']s["']:(\d+),["']r["']:["']([\s\S]+)["']}/),a=a&&a[1]&&a[2]?{s:parseInt(a[1]),r:a[2]}:{}}catch(c){a={}}a.r&&b.referrer.replace(/#.*/,"")!=a.r||alog("speed.set","wt",a.s)}}if(a.alogObjectConfig){var k=a.alogObjectConfig.sample,l=a.alogObjectConfig.rand;if("https:"===a.location.protocol){if(d="https://gss2.bdstatic.com/70cFsjip0QIZ8tyhnq"+d,!k||!l)return}else d="http://img.baidu.com"+d;k&&l&&l>k||(g(function(){alog("speed.set","lt",+new Date),e=b.createElement(c),e.async=!0,e.src=d+"?v="+~(new Date/864e5),f=b.getElementsByTagName(c)[0],f.parentNode.insertBefore(e,f)}),j())}}(window,document,"script","/hunter/alog/dp.min.js");

};

/**
 * 初始化自定义监控初始埋点
 * 该方法会记录该自定义方法的初始时间
 *
 * @param {string} name 监控点的名称，可以与dp设置不一致
 */
var startCustomSpeed = function (name) {
    if (typeof speedRecord[name] === 'undefined') {
        speedRecord[name] = null;
    }
    speedRecord[name] = new Date();
};

/**
 * 自定义测速监控名称
 *
 * @param {string} name name
 * @return {Object}
 */
var makeSpeedName = function (name) {
    return 'z_' + name + '_query';
};

/**
 * 自定义次数点击
 *
 * @param {string} name name
 * @return {string}
 */
var makeCountName = function (name) {
    return 'z_' + name + '_count';
};

/**
 * 结束并返回自定义监控埋点的总处理时间
 * 该方法会记录该自定义方法的初始时间
 *
 * @param {string} name 监控点的名称，可以与dp设置不一致
 * @param {string} [send=true] 自动发送统计的值
 * @param {string} [dpName] dp的监控名称，默认使用name
 * @return {Object}
 */
var stopCustomSpeed = function (name, send, dpName) {
    send = send ? send : true;
    if (typeof speedRecord[name] !== 'undefined') {
        var duringTime = new Date() - speedRecord[name];
        if (duringTime && send) {
            dpName = dpName || name;
            if (dpName) {
                var tmpData = {};
                tmpData[dpName] = duringTime;

                alog && alog('cus.fire', 'time', tmpData);
                // alog.fire && alog.fire('mark');
            }
        }
        // 清空
        delete speedRecord[name];
        return duringTime;
    }
    return null;
};

/**
 * 结束某一自定义监控
 * 用于在某一速度监控失败时，取消此次测速
 *
 * @param  {string} name name 监控点的名称，可以与dp设置不一致
 * @return {Object} null
 */
var terminalCustomSpeed = function (name) {
    if (typeof speedRecord[name] !== 'undefined') {
        delete speedRecord[name];
    }
    return null;
};

/**
 * 发送自定义计数
 *
 * @param {string} name name
 */
var customCount = function (name) {
    if (name) {
        alog && alog('cus.fire', 'count', name);
    }
};

/**
 * DP监控绑定backbone collection
 * 适用于对后端请求的情景
 *
 * @param {string} collection collection
 * @param {string} name dp监控的名称，如果不设置则默认使用collection id属性
 * @param {string} send send
 * @param {string} dpName dpName
 */
var dpBindCollection = function (collection, name, send, dpName) {
    if (!collection) {
        return;
    }

    name = name || collection.id;
    if (name) {
        collection.on({
            request: function () {
                startCustomSpeed(name);
            },
            sync: function () {
                stopCustomSpeed(name, send, dpName);
            },
            error: function () {
                terminalCustomSpeed(name);
            }
        });
    }
};


module.exports = {
    // 糯米B端产品线统一DP前缀
    DP_GLOBAL_CODE: DP_GLOBAL_CODE,
    init: initDp,
    makeSpeedName: makeSpeedName,
    makeCountName: makeCountName,
    startCustomSpeed: startCustomSpeed,
    stopCustomSpeed: stopCustomSpeed,
    customCount: customCount,
    terminalCustomSpeed: terminalCustomSpeed,
    dpBindCollection: dpBindCollection
};
