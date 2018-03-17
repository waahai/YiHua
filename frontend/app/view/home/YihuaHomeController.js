/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.home.YihuaHomeController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.Window',
        'Yihua.view.home.WorkoutDetailFormWindow',
        'Yihua.view.home.BroadcastDetailFormWindow'
    ],

    alias: 'controller.yihua-home',

    init: function() {
        var refs = this.getReferences();
        var store1 = refs.grid1.getStore();
        var store2 = refs.grid2.getStore();
        store1.load();
        refs.pager1.setStore(store1);
        store2.load();
        refs.pager2.setStore(store2);
    },

    onViewDetail: function (sender, record, item, index, e, eOpts) {
        this.showBroadcastDialog(record);
    },

    onAddWorkOut: function() {
        this.showWorkOutDialog();
    },

    onSearch: function() {
        var refs = this.getReferences();
        var store2 = refs.grid2.getStore();
        store2.filterBy(function( rec, id ){
            var source_data = Ext.Date.format(rec.data.from, 'Y-m-d');
            var target_data = Ext.Date.format(refs.filter.value, 'Y-m-d');
            return source_data == target_data;
        });
    },

    onRemoveWorkOut: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('确认', '确认删除【'+rec.get('reason') +'】?', function(btn){
            if( btn === 'yes' ) {
                grid.getStore().removeAt(rowIndex);
            }
        });
    },

    onRefresh2: function() {
        var refs = this.getReferences();
        refs.grid2.getStore().load();
    },

    onSaveWorkout: function() {
        var dialog = this.workoutDialog,
            form = this.workoutDialog.down('form'),
            refs = this.getReferences();

        if (form.isValid()) {
            var record = form.getRecord();
            form.updateRecord(record);
            refs.grid2.getStore().add(record);
            dialog.hide();
        }
    },

    onCommitClick: function(btn) {
        var refs = this.getReferences();
        refs.grid2.getStore().sync({
            success: Yihua.Util.success,
            failure: Yihua.Util.failure
        });
    },

    showBroadcastDialog: function(record) {
        var view = this.getView();
        this.dialog = view.add({
            xtype: 'broadcast-detail-form',
            viewModel: {
                data: {
                    title: record.get('title'),
                    time: Ext.util.Format.date(record.get('created_at'), 'Y-m-d H:m:s'),
                    body: record.get('body')
                }
            }
        });

        this.dialog.center().show();
    },

    showWorkOutDialog: function() {
        var view = this.getView();
        var record = new Yihua.model.WorkOut();
        if( !this.workoutDialog ) {
            var users = new Yihua.store.User();
            users.load();
            this.workoutDialog = view.add({
                xtype: 'workout-detail-form',
                viewModel: {
                    data: {
                        title: '添加外勤记录'
                    }
                }
            });
            this.workoutDialog.down('tagfield').setStore(users);
        }
        this.workoutDialog.down('form').loadRecord(record);
        this.workoutDialog.center().show();
    },

    onCancelClick: function () {
        this.dialog = Ext.destroy(this.dialog);
    }
});
