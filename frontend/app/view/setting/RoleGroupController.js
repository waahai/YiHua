/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.setting.RoleGroupController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.setting-role-group',

    init: function() {
        var refs = this.getReferences();
        var store = refs.grid.getStore();
        
        store.reload();
        refs.pager.doRefresh();
    },

    onItemSelected: function (sender, record) {
        var refs = this.getReferences();

        refs.form.getForm().loadRecord(record);
        if(!refs.form.isVisible()) {
            refs.form.setHidden(false);
        }
        
    },

    onInsertBtnClick: function() {
        var refs = this.getReferences();

        var store = refs.grid.getStore();
        var record = Ext.create('Yihua.model.RoleGroup', {
            name: "名称",
            type: "设计",
            no: 0
        });
        store.add(record);
        refs.grid.getSelectionModel().deselectAll();
        refs.grid.getSelectionModel().select(record);
    },

    onRemoveBtnClick: function(grid, rowIndex, colIndex) {
        var refs = this.getReferences();
        var rec = refs.grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('确认', '确认删除'+rec.get('name')+'?', function(btn){
            if( btn === 'yes' ) {

                refs.grid.getSelectionModel().deselect(rec);

                refs.grid.getStore().remove(rec);

                rec.erase({
                    success: Yihua.Util.success,
                    failure: Yihua.Util.failure
                });
            }
        }, this);
    },

    onUpdateBtnClick: function() {
        //prevent errors if no records selected
        var refs = this.getReferences();

        var form = refs.form.getForm();

        if (form.isValid()) {
            var record = form.getRecord();
            form.updateRecord(record);
            console.log(record);
            var success_handler = function(record, operation) {
                record.commit(); // ##Juris :: Commit record in the store
                // console.log('success', record, operation);
                Ext.toast({
                    html: '保存成功',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 200
                });
                // update form from computed remote record
                form.loadRecord(record);
            }

            var failure_handler = function(record, operation) {
                var exception = operation.getError();
                if (exception && exception.errors) form.markInvalid(exception.errors);
                console.log('failure', record, operation, exception);
            }


            record.save({
                success: success_handler,
                failure: failure_handler,
                scope: this
            });
            
        }
    }
});
