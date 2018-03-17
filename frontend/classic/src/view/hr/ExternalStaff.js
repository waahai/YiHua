/**
 * This view is an example list of people.
 */

Ext.define('Yihua.view.hr.ExternalStaff', {
    extend: 'Ext.grid.Panel',
    xtype: 'hr-external-staff',

    requires: [
        'Yihua.view.hr.StaffListController',
        'Yihua.store.ExternalStaff'
    ],

    controller: 'external-staff',

    title: 'Staff List',
    header: false,

    store: 'ExternalStaff',

    // session: true,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items:[{
                xtype: 'button',
                iconCls: 'fa fa-plus icon-green',
                handler: 'onAddClick',
                text: '添加挂靠人员'
            }, '-', {
                xtype: 'button',
                iconCls: 'fa fa-save icon-green',
                handler: 'onCommitClick',
                text: '保存改动'
            }, '-', {
                xtype: 'button',
                iconCls: 'fa fa-refresh icon-green',
                handler: 'onRefreshClick',
                text: '刷新'
            }, '->', {
                xtype: 'textfield',
                reference: 'filter',
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        weight: 1, // controls display order
                        hideOnReadOnly: false, //always visible
                        handler: 'onResetFilter'
                    }
                },
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
        { text: '姓名',  dataIndex: 'name' },
        { text: '性别',  dataIndex: 'gender' },
        { text: '身份证号',  dataIndex: 'identity', flex: 1 },
        { text: '电话',  dataIndex: 'mobile', width: 120 },
        { text: '教育背景',  dataIndex: 'education' },
        { text: '职称',  dataIndex: 'title' },
        { text: '注册职称',  dataIndex: 'registed_title' },
        { text: '聘任专业',  dataIndex: 'hired_field' },
        { 
            text: '合同到期日',
            formatter: 'date("Y-m-d")',
            dataIndex: 'contract_to' 
        },
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                iconCls: 'fa fa-times icon-red',
                tooltip: '删除',
                handler: 'onRemoveClick'
            }]
        }
    ],

    listeners: {
        itemclick: 'onEditClick'
    }
});

