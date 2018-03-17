Ext.define('Yihua.view.home.WorkOut', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Yihua.store.User',
        'Yihua.store.WorkOut'
    ],

    xtype: 'workout',

    title: '外勤公告',
    margin: 10,

    store: new Yihua.store.WorkOut(),

    dockedItems: [{
        xtype: 'pagingtoolbar',
        reference: 'pager2',
        dock: 'bottom'
    }],

    initComponent: function() {

        var users = new Yihua.store.User();

        users.load();

        Ext.apply(this, {

            columns: [
                { text: '事由', dataIndex: 'reason' },
                { text: '去向', dataIndex: 'place' },
                { text: '开始时间', dataIndex: 'from', width: 150,
                    formatter: 'date("Y-m-d H:m:s")' },
                { text: '结束时间', dataIndex: 'to', width: 150,
                    formatter: 'date("Y-m-d H:m:s")' },
                { 
                    text: '人员', 
                    dataIndex: 'user_ids',
                    tdCls: 'multiline-text',
                    flex: 1,
                    renderer: function(uids){
                        uids = uids || [];
                        if(uids.length == 0) return "";
                        var names = [];
                        for( var idx in uids) {
                            var name = users.getById( uids[idx]).get('name');
                            names.push(name);
                        }
                        return names.join(', ');
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 25,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        iconCls: 'fa fa-times icon-red',
                        tooltip: '删除外勤',
                        isDisabled: function(v, r, c, item, rec) {
                            return  (rec.get('author_id') != Yihua.user.id);
                        },
                        handler: 'onRemoveWorkOut'
                    }]
                }
            ],

            tbar: [{
                text: '添加外勤',
                iconCls: 'fa fa-plus icon-green',
                handler: 'onAddWorkOut'
            }, '-', {
                text: '提交改动',
                iconCls: 'fa fa-save icon-green',
                handler: 'onCommitClick'
            }, '-', {
                text: '刷新',
                iconCls: 'fa fa-refresh icon-green',
                handler: 'onRefresh2'
            }, '->', {
                xtype: 'datefield',
                reference: 'filter',
                value: new Date,
                format: 'Y-m-d'
            }, {
                xtype: 'button',
                handler: 'onSearch',
                text: '搜索'
            }]
        });

        this.callParent();
    }

});
