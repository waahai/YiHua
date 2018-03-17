Ext.define('Yihua.view.Header', {
    extend: 'Ext.Container',
    xtype: 'appHeader',
    id: 'app-header',
    title: '屹华建筑信息管理系统',
    height: 80,
    layout: {
        type: 'hbox',
        align: 'middle'
    },

    initComponent: function() {
        document.title = this.title;

        this.items = [{
            xtype: 'component',
            id: 'app-header-logo'
        },{
            xtype: 'component',
            id: 'app-header-title',
            html: this.title,
            flex: 1
        }, {
            xtype: 'button',
            text: '退出',
            id: 'app-header-logout',
            handler: 'onLogout'
        }];

        this.callParent();
    }
});
