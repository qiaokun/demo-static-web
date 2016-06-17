/**
 * @file 用户页面
 *
 * @author CK
 */
require('./index.css');
module.exports = require('VueModel').getComponent({
    ready: function () {
        this.init();
        this.bindEvent();
    },
    template: require('./index.tpl.html'),
    data: function () {
        return {
            search: {
                keyword: ''
            }
        };
    },
    components: {},
    events: {},
    methods: {
        init: function () {
            var me = this;
            me.initGrid();
        },
        bindEvent: function () {
            
        },
        initGrid: function () {
            $(this.$els.list).datagrid({
                loader: this.listLoader,
                singleSelect: true,
                loadMsg: '数据加载中...',
                pagination: true,
                pageSize: 10,
                columns: [[
                		{
					        field: 'ck',
					        checkbox: true
					    },
					    {
					        field: 'name',
					        resizable: false,
					        title: '用户名',
					        width: '15%'
					    },
					    {
					        field: 'email',
					        resizable: false,
					        title: '邮箱',
					        width: '15%'
					    },
					    {
					        field: 'phone',
					        resizable: false,
					        title: '手机号',
					        width: '15%'
					    },
					    {
					        field: 'sex',
					        resizable: false,
					        title: '性别',
					        width: '8%',
					        formatter: function (value, row, index) {
					            if (value == '1') {
					                return '男';
					            } else if (value == '2') {
					                return '女';
					            } else {
					                return value;
					            }
					        }
					    },
					    {
					        field: 'roleName',
					        resizable: false,
					        title: '角色',
					        width: '15%'
					    },
					    {
					        field: 'createTime',
					        resizable: false,
					        title: '创建时间',
					        width: '15%'
					    },
					    {
					        field: 'status',
					        resizable: false,
					        title: '状态',
					        width: '8%',
					        formatter: function (value, row, index) {
					            if (value == '1') {
					                return '可用';
					            } else if (value == '2') {
					                return '禁用';
					            } else {
					                return value;
					            }
					        }
					    }
					]]
            });
        },
        listLoader: function (param, success, error) {
            var params = {
                keyword: this.$data.search.keyword,
                limit: param.rows,
                currentPage: param.page
            };
            $.request('./user/list', {
                data: params,
                type: 'POST'
            }).then(function (json) {
                var data = {
                    total: json.data.total,
                    rows: json.data.rows
                };
                success(data);
            }, function (json) {
                $.messager.alert('失败', json.statusInfo || '数据加载失败，请稍后再试！', 'error');
            });
        },
        searchList: function () {
            $(this.$els.list).datagrid('reload');
        }
    }
});