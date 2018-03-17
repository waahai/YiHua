
/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */

Ext.define('Yihua.view.setting.Permission', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Yihua.model.Permission',
        'Yihua.model.RolePermission'
    ],

    xtype: 'setting-permission',

    title: 'Role Permission List',
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
            model: 'Yihua.model.Permission',
            id: 'permissions_store',
            autoLoad: true
        });

        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: new Ext.data.Store({
                // destroy the store if the grid is destroyed
                autoDestroy: true,
                model: Yihua.model.Role,
                pageSize: 0,
                sorters: [{
                    property: 'name',
                    direction:'ASC'
                }]
            }),
            columns: [{
                xtype: 'rownumberer'
            }, {
                header: '岗位名称',
                dataIndex: 'name'
            }, 
            {
            	header: '权限',
		        dataIndex: 'permission_ids',
		        tdCls: 'multiline-text',
		        flex: 1,
		        style: {
		        	'white-space': 'normal'
		        },
		        renderer:function(permission_ids){
		        	permission_ids = permission_ids || [];
                    if(permission_ids.length == 0) return "";
                    var names = [];
                    for( var idx in permission_ids) {
                    	var name = Ext.StoreMgr.get('permissions_store').getById( permission_ids[idx]).get('name');
                    	names.push(name);
                    }
                    return names.join(', ');
                },
		        editor: new Ext.form.field.Tag({
                    store: 'permissions_store',
			        displayField: 'name',
			        valueField: 'id',
			        queryMode: 'remote'
                })
		    }, 
		    {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'fa fa-times icon-red',
                    tooltip: '清空',
                    scope: this,
                    handler: this.onCleanClick
                }]
            }],
            selModel: {
                type: 'cellmodel'
            },
            tbar: [{
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

    onCleanClick: function(grid, rowIndex){
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('确认', '确认清除【'+rec.get('name') +'】所有权限?', function(btn){
            if( btn === 'yes' ) {
                rec.permissions = '';
            }
        });
    }
});