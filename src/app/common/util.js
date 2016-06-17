/**
 * @file 全局工具方法
 *
 * @author CK
 */

'use strict';

/**
 * 格式化时间
 *
 * @param {Object} date 日期对象
 * @param {string} fmt 格式
 * @return {string} value
 */
exports.formatDate = function (date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};

/**
 * 解析全局命令空间
 *
 * @param {string} namespace 命名空间
 * @param {Object} obj 扩展内容
 */
exports.parseGlobeNs = function (namespace, obj) {
    var ns = namespace.split('.');
    var base = window;
    for (var i = 0; i < ns.length; i++) {
        var item = ns[i];
        if (!base[item]) {
            base[item] = {};
        }
        base = base[item];
    }
    $.extend(base, obj);
};

/**
 * 初始多选下拉框
 *
 * @param {Element} el 元素对象
 * @param {string} url 数据请求地址
 * @param {Object} requestParam 请求参数
 *
 */
exports.multiSelectInit = function (el, url, requestParam) {
    var $el = $(el);
    var opts = $el.combobox('options');

    function onSelect(record) {
        if (String(record[opts.valueField]) === '-1') {
            $el.combobox('clear').combobox('setValues', ['-1']);
        }
        else {
            var values = $el.combobox('getValues');
            var index = -1;
            if ((index = $.inArray('-1', values)) > -1) {
                values.splice(index, 1);
            }
            $el.combobox('setValues', values);
        }
    }
    function onUnselect(record) {
        var values = $el.combobox('getValues');
        if (values.length === 0) {
            $el.combobox('setValues', ['-1']);
        }
    }
    function loader(param, onSucc, onFail) {
        $.request(url, requestParam || {method: 'post'}).then(function (json) {
            var data = json.data || [];
            data.unshift({id: '-1', text: '全部', selected: true});
            onSucc(data);
        });
    }

    $el.combobox({
        onSelect: onSelect,
        onUnselect: onUnselect,
        loader: loader
    });
};


exports.loading = function () {
    var top = ($(parent).outerHeight() - 40) / 2
        + $(parent.document).scrollTop()
        - (parent === window ? 0 : 120);

    $('<div class="datagrid-mask"></div>').css({
        display: 'block',
        width: '100%',
        height: $(window).height()
    }).appendTo('body');

    $('<div class="datagrid-mask-msg"></div>').html('正在处理，请稍候...').appendTo('body').css({
        display: 'block',
        left: ($(document.body).outerWidth(true) - 190) / 2,
        top: top

    });
};

exports.loadingEnd = function () {
    $('.datagrid-mask').remove();
    $('.datagrid-mask-msg').remove();
};

/**
 * iframe 中模拟 position:fixed
 *
 * @param {string|jquery} selector 选择器或jquery对象
 * @param {number} offsetY 偏移量
 */
exports.simulaIframeFixed = function (selector, offsetY) {
    typeof selector === 'string' && (selector = $(selector));
    if (!selector.length) {
        return;
    }

    $(parent.window).scroll(function () {
        var top = Math.max($(parent.window).scrollTop() + offsetY, 0);
        selector.css({
            top: top
        });
    });
};


