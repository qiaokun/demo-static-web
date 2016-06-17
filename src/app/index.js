/**
 * @file 项目入口文件
 *
 * @author CK
 */

require('./index.css');

window.$ = window.jQuery = require('jquery');

require('easyui');

require('./config-router');

require('easyui/locale/easyui-lang-zh_CN');

require('ajax');

require('./common/easyui');

module.exports = require('timer').displayTime($("#systime"));

// $(function () {
// 	$('#tt').tree({
// 		onClick: function(node) {
// 			if (node.url == '' || node.url == null || node.url == undefined) {

// 			} else {
// 				$.request('#!/' + node.url, {
//                 	type: 'POST'
// 	            }).then(function (json) {
// 	                success(json);
// 	            }, function (json) {
// 	                $.messager.alert('失败', json.statusInfo || '数据加载失败，请稍后再试！', 'error');
// 	            });
// 			}
// 		}
// 	});
// });

try {
    document.domain = 'demo.com';
} catch (e) {}
