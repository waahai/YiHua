/**
 * This view is an example list of people.
 */
Ext.define('Yihua.view.setting.RoleGroup', {
    extend:'Ext.container.Container',
    xtype: 'setting-role-group',

    requires: [
        'Yihua.view.setting.RoleGroupController',
        'Yihua.store.RoleGroup'
    ],

    controller: 'setting-role-group',

    title: 'Role Group List',
    header: false,

    layout: 'column',

    items: [
        {
            xtype: 'gridpanel',
            columnWidth: 1,
            margin: 10,
            store: 'RoleGroup',
            reference: 'grid',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items:[
                    {
                        xtype: 'button',
                        handler: 'onInsertBtnClick',
                        iconCls: 'fa fa-plus icon-green',
                        text: '新增'
                    }
                ]
            },{
                xtype: 'pagingtoolbar',
                reference: 'pager',
                store: 'RoleGroup',   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }],
            columns: [
                {xtype: 'rownumberer'},
                { text: '名称',  dataIndex: 'name' },
                { text: '分类', dataIndex: 'type', flex: 1 },
                { text: '编号', dataIndex: 'no', flex: 1 },
                {
                        menuDisabled: true,
                        sortable: false,
                        xtype: 'actioncolumn',
                        width: 26,
                        items: [{
                            iconCls: 'fa fa-times icon-red',
                            style: 'color: #f00',
                            tooltip: '删除',
                            handler: 'onRemoveBtnClick'
                        }]
                    }
            ],

            listeners: {
                select: 'onItemSelected'
            }
        }, {
            xtype: 'form',
            reference: 'form',
            border: true,
            split: true,
            width: 350,
            margin: 10,
            hidden: true,
            title: 'Edit details',
            header: false,
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    padding: 5,
                    msgTarget: 'under',
                    fieldLabel: '名称',
                    name: 'name'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: '类型',
                    forceSelection: true,
                    editable: false,
                    displayField: 'val',
                    valueField: 'key',
                    padding: 5,
                    store: {
                        fields: ['key', 'val'],
                        data: [ 
                            {key: '管理', val: '管理'}, 
                            {key: '设计', val: '设计'}
                        ]
                    },
                    queryMode: 'local',
                    name: 'type'
                },
                {
                    xtype: 'numberfield',
                    allowBlank: false,
                    padding: 5,
                    hideTrigger: true,
                    msgTarget: 'under',
                    fieldLabel: '排序值',
                    name: 'no'
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            handler: 'onUpdateBtnClick',
                            iconCls: 'fa fa-save icon-green',
                            text: '保存'
                        }
                    ]
                }
            ]
        }]
});
