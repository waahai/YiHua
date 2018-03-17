/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.setting.BroadcastController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.setting-broadcast',

    init: function() {
        // var refs = this.getReferences();
        // var store = refs.grid.getStore();
        
        // store.reload();
        // refs.pager.doRefresh();
    },

    loadStore: function() {
        this.getView().getStore().load();
    },

    onSaveClick: function() {
        this.getView().getStore().sync({
            success: Yihua.Util.success,
            failure: Yihua.Util.failure
        });
    },

    onFormSave: function() {
        var win = this.lookupReference('broadcast-form-window');
        if(!win) return;
        var form = win.down('form');
        if (!form.isValid()) { return; }
        var rec = form.getRecord();
        form.updateRecord(rec);
        if(!this.isEdit) {
            this.getView().getStore().add(rec);
        }
        win.close();
    },

    showWindowWithRecord: function(rec) {
        this.isEdit = !!rec;

        rec = rec || new Yihua.model.Broadcast({
            title: '',
            body: '',
            created_at: new Date()
        });

        var win = this.lookupReference('broadcast-form-window');

        if (!win) {
            win = new Yihua.view.setting.BroadcastFormWindow();

            this.getView().add(win);
        }

        win.down('form').loadRecord(rec);
        
        win.center().show();
    },

    onViewClick: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        this.showWindowWithRecord(rec);
    },

    onAddClick: function(){
        this.showWindowWithRecord(null);
    },

    onRemoveClick: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('确认', '确认删除【'+rec.get('title') +'】?', function(btn){
            if( btn === 'yes' ) {
                grid.getStore().removeAt(rowIndex);
            }
        });
    }
});
