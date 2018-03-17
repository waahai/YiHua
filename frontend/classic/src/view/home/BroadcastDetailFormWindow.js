Ext.define('Yihua.view.home.BroadcastDetailFormWindow', {
    extend: 'Ext.window.Window',
    xtype: 'broadcast-detail-form',

    layout: 'fit',
    modal: true,
    width: 680,
    height: 460,
    scrollable: true,
    closable: true,

    bind: {
        title: '{title}'
    },
    
    buttons: [{
        text: '关闭',
        handler: 'onCancelClick'
    }],
    items: [{
        scrollable: true,
        bind: {
            html: ['<div>', 
                '<h1 style="text-align:center">{title}</h1>',
                '<div style="text-align:center"><span>{time}</span></div>',
                '<div style="margin-top: 20px;">{body}</div>',
                '</div>'].join('')
        }
    }]
});