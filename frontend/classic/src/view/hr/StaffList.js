/**
 * This view is an example list of people.
 */
Ext.define('Yihua.view.hr.StaffList', {
    extend: 'Ext.grid.Panel',
    xtype: 'hr-staff-list',

    requires: [
        'Yihua.view.hr.StaffListController',
        'Yihua.store.PagedUser'
    ],

    controller: 'staff-list',

    title: 'Staff List',
    header: false,

    store: 'PagedUser',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items:[{
                xtype: 'button',
                iconCls: 'fa fa-plus icon-green',
                handler: 'onAddClick',
                text: '添加员工'
            }, '-', {
                xtype: 'button',
                iconCls: 'fa fa-save icon-green',
                handler: 'onCommit',
                text: '提交保存'
            }, '->', {
                xtype: 'combobox',
                reference: 'statusFilter',
                queryMode: 'local',
                forceSelection: true,
                editable: false,
                width: 80,
                value: '在职',
                store: [['全部', '全部'], ['在职', '在职'], ['离职', '离职']]
            }, {
                xtype: 'textfield',
                reference: 'filter',
                emptyText: '姓名关键字'
            },{
                xtype: 'button',
                handler: 'onSearch',
                text: '搜索'
            }
        ]
    },{
        xtype: 'pagingtoolbar',
        reference: 'pager',
        dock: 'bottom',
        displayInfo: true
    }],
    // selType: 'checkboxmodel',
    columns: [
        {xtype: 'rownumberer'},
        { text: '工号',  dataIndex: 'username' },
        { text: '姓名',  dataIndex: 'name' },
        { text: '性别',  dataIndex: 'gender' },
        { text: '证件号码',  dataIndex: 'identity', flex: 1 },
        {
            text: '出生日期', 
            dataIndex: 'birthday', 
            formatter: 'date("Y-m-d")'
        },
        { text: '手机', dataIndex: 'mobile', width: 110 },
        { text: '邮件', dataIndex: 'email', flex: 1 },
        { text: '办公电话', dataIndex: 'telephone' },
        {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    iconCls: 'fa fa-ban icon-red',
                    tooltip: '禁用账户',
                    handler: 'onBanClick'
                }]
            }
    ],

    listeners: {
        itemclick: 'onEditClick'
    }
});
