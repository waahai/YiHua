/**
 * This view is an example list of people.
 */
Ext.define('Yihua.view.demo.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'grids',

    requires: [
        'Yihua.view.demo.ListController',
        'Yihua.store.DemoList'
    ],

    controller: 'demo-list',

    title: 'Demo List',
    header: false,

    store: 'DemoList',

    dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items:[
                    {
                        xtype: 'button',
                        action: 'insertRecord',
                        icon: 'resources/images/plus-circle.png',
                        text: '新增'
                    },
                    '->',
                    {
                        xtype: 'textfield',
                        itemId: 'filter',
                        triggers: {
                            clear: {
                                cls: 'x-form-clear-trigger',
                                weight: 1, // controls display order
                                hideOnReadOnly: false, //always visible
                                handler: function(trigger) {
                                    trigger.reset();
                                    this.fireEvent('reset', trigger);
                                }
                            }
                        },
                        emptyText: 'Filter'
                    },{
                        xtype: 'button',
                        action: 'filterStore',
                        text: '搜索'
                    }
                ]
            },{
                xtype: 'pagingtoolbar',
                reference: 'pager',
                store: 'DemoList',   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }],
    selType: 'checkboxmodel',
    columns: [
        {xtype: 'rownumberer'},
        { text: '姓名',  dataIndex: 'name' },
        { text: '邮件', dataIndex: 'email', flex: 1 },
        { text: '电话', dataIndex: 'mobile', flex: 1 },
        {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    iconCls: 'fa fa-ban',
                    tooltip: '禁用账户',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.alert('Sell', 'Sell ' + rec.get('name'));
                    }
                },{
                    iconCls: 'fa fa-times',
                    tooltip: '删除',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.alert('Sell', 'Sell ' + rec.get('name'));
                    }
                }]
            }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
