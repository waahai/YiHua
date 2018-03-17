/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.hr.StaffListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.staff-list',

    requires: [
        'Ext.window.Window',
        'Yihua.view.hr.StaffDetailFormWindow'
    ],

    init: function() {
        var refs = this.getReferences();
        var store = this.getView().getStore();
        
        store.setFilters([{
            property: 'status',
            value: '在职'
        }])
        store.load();
        refs.pager.setStore(store);
    },

    onSearch: function(btn) {
        var refs = this.getReferences();
        var store = this.getView().getStore();
        var name = refs.filter.getValue();
        var status = refs.statusFilter.getValue();

        var filters = [];
        if( name != '' ) {
            filters.push({
                property: 'name',
                value: name
            });
        }

        if( status != '全部' ) {
            filters.push({
                property: 'status',
                value: status
            });
        }

        if( filters.length == 0 ) {
            store.clearFilter();
            return;
        }

        store.setFilters(filters);
    },

    onRefreshClick: function() {
        this.loadStore();
    },

    createDialog: function(record) {
        this.isEdit = !!record;

        record = record || new Yihua.model.User({
            gender: '男',
            education: '其它',
            hired_field: '其它',
            title: '其它',
            registed_title: '其它',
            status: '在职',
            password: Yihua.util.MD5.decode('2222'),
            work_status: '正式'
        });

        var view = this.getView();
        
        this.dialog = view.add({
            xtype: 'staff-detail-form',
            viewModel: {
                data: {
                    title: record ? '编辑: ' + record.get('name') : '新增挂靠人员'
                }
            }
        });

        this.dialog.down('form').loadRecord(record);

        if( !this.roles ) {
            this.roles = new Yihua.store.Role();
            this.roles.load();
        }

        this.lookupReference('role').setStore(this.roles);
        this.lookupReference('snd_role').setStore(this.roles);

        if( !this.salaryLevels ) {
            this.salaryLevels = new Yihua.store.SalaryLevel();
            this.salaryLevels.load();            
        }
        this.lookupReference('salary_level').setStore(this.salaryLevels);

        this.dialog.center().show();
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

    onBanClick: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('确认', '确认禁用【'+rec.get('name') +'】?', function(btn){
            if( btn === 'yes' ) {
                // grid.getStore().removeAt(rowIndex);
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

    onCommit: function() {
        this.getView().getStore().sync({
            success: function() {
                Ext.toast({
                    html: '保存成功',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 200
                });
                me.loadStore();
            },
            failure: function(record, operation) {
                var exception = operation.getError();
                Ext.Msg.alert('保存失败', exception.errors);
            }
        });
    },

    onCancelClick: function () {
        this.dialog = Ext.destroy(this.dialog);
    }
});
