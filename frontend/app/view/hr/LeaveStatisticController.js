/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.hr.LeaveStatisticController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.leave-statistic',

    init: function() {
    },

    loadStore: function() {
        this.getView().getStore().load();
    },

    onItemSelect: function (sender, record, item, index, e, eOpts) {
        this.showDetailWindow(record);
    },

    onSearch: function(btn) {
        var refs = this.getReferences();
        var store = this.getView().getStore();
        if( !refs.filterFrom.isValid() ){
            Ext.Msg.alert('错误', '开始时间不合法');
            return;
        }
        if( !refs.filterTo.isValid() ){
            Ext.Msg.alert('错误', '结束时间不合法');
            return;
        }
        var from = refs.filterFrom.value;
        var to = refs.filterTo.value;

        store.setFilters([{
            property: 'from',
            value: Ext.Date.format(from, 'Y-m-d 00:00:00')
        }, {
            property: 'to',
            value: Ext.Date.format(to, 'Y-m-d 23:59:59')
        }]);

    },

    showDetailWindow: function(rec) {
        var win = this.lookupReference('leave-statistic-detail');
        
        if (!win) {
            win = new Yihua.view.hr.LeaveStatisticDetail();

            this.getView().add(win);
        }
        console.log(rec);
        win.down('grid').getStore().setFilters([
            { property: 'user_id', value: rec.id }, 
            { property: 'from', value: {from: rec.get('from'), to: rec.get('to')}, operator: 'in' } 
        ]);

        win.center().show();
    }
});
