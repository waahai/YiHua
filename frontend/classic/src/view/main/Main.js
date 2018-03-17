/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Ext.layout.container.Card',

        'Yihua.view.main.MainController',
        'Yihua.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: 'card',

    items: [{
        id: 'card-loading',
        xtype: 'panel',
        layout: 'center',
        items: [{
            html: '<i style="font-size: 32px" class="fa fa-refresh fa-spin"></i>'
        }]
    }, {
        id: 'card-login',
        xtype: 'panel',
        layout: 'center',
        items: [{
            xtype: 'login',
            reference: 'loginForm'
        }]
    }, {
        id: 'card-main',
        xtype: 'panel',
        layout: 'border',
        items: [{
            region: 'north',
            xtype: 'appHeader'
        }, {
            region: 'west',
            reference: 'tree',
            xtype: 'navigation-tree'
        }, {
            region: 'center',
            xtype: 'contentPanel',
            reference: 'contentPanel',
            ariaRole: 'main'
        }]
    }]
});