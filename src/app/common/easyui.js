/**
 * @file 全局功能方法，主要修复easyuibug
 *
 * @author CK
 */

'use strict';

function init() {
    fixDatagridLoadData();
    overrideWindowVcenter();
    fixMessagerAlertTop();
}

function fixDatagridLoadData() {
    var loadData = $.fn.datagrid.methods.loadData;
    $.fn.datagrid.methods.loadData = function (jq, data) {
        loadData.call(this, jq, data);

        return jq.each(function () {
            var opts = $.data(this, 'datagrid').options;
            if (opts.columns && opts.columns.length === 1) {
                var cols = opts.columns[0];
                var arr = ['<style type="text/css">'];
                for (var i = 0; i < cols.length; i++) {
                    var col = cols[i];
                    if (col && !col.checkbox) {
                        var width = col.boxWidth ? col.boxWidth + 'px' : 'auto';
                        arr.push('.' + col.cellClass + '{width:' + width + '}');
                    }
                }
                arr.push('</style>');
                $(arr.join('\n')).appendTo(this);
            }
        });
    };
}

function overrideWindowVcenter() {
    // window 组件在iframe时，计算位置不正确
    $.fn.dialog.methods.vcenter = $.fn.window.methods.vcenter = function (jq) {
        return jq.each(function () {
            var height = $(this).height();
            var top = Math.ceil(($(parent).outerHeight() - height) / 2
                + $(parent.document).scrollTop()
                - (parent === window ? 0 : 120));
            $(this).window('move', {top: top});
        });
    };
}

function fixMessagerAlertTop() {
    var mAlert = $.messager.alert;
    $.messager.alert = function (title, msg, icon, fn) {
        var opts = typeof title === 'object' ? title : {
            title: title,
            msg: msg,
            icon: icon,
            fn: fn
        };
        if (typeof opts.top === 'undefined') {
            var height = opts.height || 250;
            var top = ($(parent).outerHeight() - height) / 2
                + $(parent.document).scrollTop();

            if (parent !== window) {
                var offset = $(parent.document.body).height() - $(document.body).height();
                top = top - offset;
            }

            opts.top = top;
        }
        mAlert.call(this, opts);
    };
}

init();

