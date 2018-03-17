/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.demo.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.demo-list',

    init: function() {
        var refs = this.getReferences();
        var store = this.getView().getStore();
        
        store.load();
        refs.pager.doRefresh();
    },

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
