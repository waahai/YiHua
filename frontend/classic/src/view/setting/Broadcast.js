/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
Ext.define('Yihua.view.setting.Broadcast', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Yihua.view.setting.BroadcastController',
        'Yihua.store.Broadcast'
    ],

    xtype: 'setting-broadcast',

    controller: 'setting-broadcast',

    title: '通知管理',
    header: false,

    listeners: {
        afterlayout: {
            delay: 1,
            single: true,
            fn: 'loadStore'
        }
    },

    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        var bs = new Yihua.store.Broadcast();
        var users = new Yihua.store.User();
        users.load();
        Ext.apply(this, {
            plugins: [this.cellEditing],

            store: bs,

            dockedItems: [{
                html: '提示: 点击单元格可以编辑数据',
                margin: 10,
                dock: 'bottom'
            }, {
                xtype: 'pagingtoolbar',
                reference: 'pager',
                store: bs,   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }],

            columns: [{
                xtype: 'rownumberer'
            }, {
                header: '标题',
                dataIndex: 'title',
                flex: 1,
                editor: {
                    allowBlank: false,
                    blankText: '标题不能为空',
                    maxLength: 50,
                    maxLengthText: '标题最多{0}位'
                }
            }, {
                header: '隐藏',
                dataIndex: 'show',
                renderer:function(v){
                    return v == '隐藏' ? '<span class="label label-default">已隐藏</span>' : '-';
                },
                editor: new Ext.form.field.ComboBox({
                    forceSelection: true,
                    editable: false,
                    triggerAction: 'all',
                    queryMode: 'local',
                    store: [['显示', '显示'], ['隐藏', '隐藏']]
                })
            }, {
                header: '发布时间',
                dataIndex: 'created_at',
                width: 150,
                formatter: 'date("Y-m-d H:m:s")'
            }, {
                header: '发布人',
                dataIndex: 'author_id',
                renderer:function(authorId){
                    if(!authorId) return "-";
                    return users.getById(authorId).get('name');
                }
            }, {
                xtype: 'actioncolumn',
                width: 50,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'fa fa-info-circle icon-green',
                    tooltip: '查看详情',
                    handler: 'onViewClick'
                }, {
                    iconCls: 'fa fa-times icon-red',
                    tooltip: '删除',
                    handler: 'onRemoveClick'
                }]
            }],
            selModel: {
                type: 'cellmodel'
            },
            tbar: [{
                text: '添加新通知',
                iconCls: 'fa fa-plus icon-green',
                handler: 'onAddClick'
            }, '-', {
                text: '保存改动',
                iconCls: 'fa fa-save icon-green',
                handler: 'onSaveClick'
            }, '-', {
                text: '刷新',
                iconCls: 'fa fa-refresh icon-green',
                handler: 'loadStore'
            }]
        });

        this.callParent();
    }
});