Ext.define('Yihua.view.home.YihuaHome', {
    extend:'Ext.container.Container',
    xtype: 'yihua-home',

    requires: [
        'Yihua.view.home.YihuaHomeController',
        'Ext.ux.DateTimePicker',
        'Ext.ux.DateTimeField',
        'Yihua.store.PublicBroadcast',
        'Yihua.store.WorkOut',
        'Yihua.store.User'
    ],

    controller: 'yihua-home',

    title: 'Yihua Home',
    header: false,

    layout: 'column',

    items: [{
        xtype: 'gridpanel',
        columnWidth: 0.4,
        title: '公司公告',
        margin: 10,
        frame: true,
        reference: 'grid1',
        store: new Yihua.store.PublicBroadcast(),
        dockedItems: [{
            xtype: 'pagingtoolbar',
            reference: 'pager1',
            dock: 'bottom'
        }],
        columns: [
            { text: '标题', dataIndex: 'title', flex: 1 },
            { text: '发表时间', dataIndex: 'created_at', width: 150,
                formatter: 'date("Y-m-d H:m:s")' }
        ],
        listeners: {
            itemclick: 'onViewDetail'
        }
    }, {
        xtype: 'workout',
        columnWidth: 0.6,
        frame: true,
        reference: 'grid2'
    }]
    
});
