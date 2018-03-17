/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */

Ext.define('Yihua.view.setting.Role', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Yihua.store.RoleGroup',
        'Yihua.model.Role'
    ],

    xtype: 'setting-role',

    title: 'Role List',
    header: false,

    dockedItems: [{
        html: '提示: 点击单元格可以编辑数据',
        margin: 10,
        dock: 'bottom'
    }],

    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.create('Ext.data.Store', {
            model: 'Yihua.model.RoleGroup',
            id: 'role_group_store',
            autoLoad: true
        })

        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: new Ext.data.Store({
                // destroy the store if the grid is destroyed
                autoDestroy: true,
                model: Yihua.model.Role,
                sorters: [{
                    property: 'role_group_id',
                    direction:'ASC'
                }, {
                    property: 'order',
                    direction:'ASC'
                }]
            }),
            columns: [{
                xtype: 'rownumberer'
            }, {
                header: '三级岗位名称',
                dataIndex: 'name',
                flex: 1,
                editor: {
                    allowBlank: false,
                    blankText: '级别不能为空',
                    maxLength: 10,
                    maxLengthText: '级别最多{0}位'
                }
            }, {
                header: '二级岗位',
                dataIndex: 'role_group_id',
                renderer:function(roleGroupId){
                    if(!roleGroupId) return "";
                    return Ext.StoreMgr.get('role_group_store').getById(roleGroupId).get('name');
                },
                flex: 1,
                editor: new Ext.form.field.ComboBox({
                    forceSelection: true,
                    editable: false,
                    triggerAction: 'all',
                    displayField: 'name',
                    valueField: 'id',
                    queryMode: 'remote',
                    store: 'role_group_store'
                })
            }, {
                header: '一级岗位',
                dataIndex: 'role_group_id',
                flex: 1,
                renderer:function(roleGroupId){
                    if(!roleGroupId) return "";
                    return Ext.StoreMgr.get('role_group_store').getById(roleGroupId).get('type');
                }
            }, {
                header: '排序值',
                dataIndex: 'order',
                flex: 1,
                align: 'right',
                editor: {
                    xtype: 'numberfield',
                    hideTrigger: true,
                    allowBlank: false
                }
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'fa fa-times icon-red',
                    tooltip: '删除',
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }],
            selModel: {
                type: 'cellmodel'
            },
            tbar: [{
                text: '添加三级岗位',
                iconCls: 'fa fa-plus icon-green',
                scope: this,
                handler: this.onAddClick
            }, '-', {
                text: '保存改动',
                iconCls: 'fa fa-save icon-green',
                scope: this,
                handler: this.onSaveClick
            }, '-', {
                text: '刷新',
                iconCls: 'fa fa-refresh icon-green',
                scope: this,
                handler: this.loadStore
            }]
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });
    },

    loadStore: function() {
        this.getStore().load();
    },

    onSaveClick: function() {
        this.getStore().sync({
            success: function() {
                Ext.toast({
                    html: '保存成功',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 200
                });
            },
            failure: function(record, operation) {
                var exception = operation.getError();
                Ext.Msg.alert('保存失败', exception.errors);
            }
        });
    },

    onAddClick: function(){
        // Create a model instance
        var rec = new Yihua.model.Role({
            name: '新岗位',
            role_group_id: 0,
            order: 0
        });

        this.getStore().insert(0, rec);
        this.cellEditing.startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onRemoveClick: function(grid, rowIndex){
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('确认', '确认删除【'+rec.get('name') +'】?', function(btn){
            if( btn === 'yes' ) {
                me.getStore().removeAt(rowIndex);
                console.log(rec);
            }
        });
    }
});