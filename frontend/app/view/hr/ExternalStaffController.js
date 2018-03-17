/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.hr.ExternalStaffController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.external-staff',

    requires: [
        'Ext.window.Window',
        'Yihua.view.hr.ExternalStaffFormWindow'
    ],

    init: function() {
        var refs = this.getReferences();
        var store = this.getView().getStore();
        this.loadStore();
        refs.pager.setStore(store);
    },

    loadStore: function() {
        this.getView().getStore().load();
    },

    onResetFilter: function(trigger) {
        trigger.reset();
        var store = this.getView().getStore();
        store.clearFilter();
    },

    onCommitClick: function(btn) {
        this.getView().getStore().sync({
            success: Yihua.Util.success,
            failure: Yihua.Util.failure
        });
    },

    onSearch: function(btn) {
        var refs = this.getReferences();
        var filter = refs.filter.getValue();
        if( filter === '' ) {
            return;
        }

        var store = this.getView().getStore();

        store.setFilters([{
            property: 'name',
            value: filter
        }]);
    },

    onRefreshClick: function() {
        this.loadStore();
    },

    createDialog: function(record) {
        this.isEdit = !!record;

        record = record || new Yihua.model.ExternalStaff();

        var view = this.getView();
        
        this.dialog = view.add({
            xtype: 'external-staff-form',
            viewModel: {
                data: {
                    title: record ? '编辑: ' + record.get('name') : '新增员工'
                }
            }
        });

        this.dialog.down('form').loadRecord(record);

        this.dialog.show();
    },

    onAddClick: function() {
        this.createDialog(null);
    },

    onEditClick: function (sender, record, item, index, e, eOpts) {
        this.createDialog(record);
    },

    onRemoveClick: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('确认', '确认删除【'+rec.get('name') +'】?', function(btn){
            if( btn === 'yes' ) {
                grid.getStore().removeAt(rowIndex);
            }
        });
    },

    onSaveClick: function () {
        // Save the changes pending in the dialog's child session back to the
        // parent session.
        var dialog = this.dialog,
            form = this.lookupReference('form'),
            isEdit = this.isEdit;

        if (form.isValid()) {
            var record = form.getRecord();
            form.updateRecord(record);
            if(!isEdit) {
                this.getView().getStore().add(record);
            }
            this.onCancelClick();
        }
    },

    onCancelClick: function () {
        this.dialog = Ext.destroy(this.dialog);
    }
});
