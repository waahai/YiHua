/**
 * This example shows how to enable users to edit the contents of a grid. Note that cell
 * editing is not recommeded on keyboardless touch devices.
 */
Ext.define('Yihua.view.setting.SalaryLevel', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Yihua.model.SalaryLevel'
    ],

    xtype: 'setting-salary-level',

    title: 'Edit Plants',
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

        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: new Ext.data.Store({
                // destroy the store if the grid is destroyed
                autoDestroy: true,
                model: Yihua.model.SalaryLevel,
                sorters: [{
                    property: 'group',
                    direction:'ASC'
                }, {
                    property: 'level',
                    direction:'ASC'
                }]
            }),
            columns: [{
                xtype: 'rownumberer'
            }, {
                header: '分类',
                dataIndex: 'group',
                flex: 1,
                editor: new Ext.form.field.ComboBox({
                    forceSelection: true,
                    editable: false,
                    triggerAction: 'all',
                    store: [
                        ['管理人员','管理人员'],
                        ['行政人员','行政人员'],
                        ['设计人员','设计人员'],
                        ['试用期人员','试用期人员'],
                        ['实习生','实习生'],
                        ['其它','其它']
                    ]
                })
            }, {
                header: '级别',
                dataIndex: 'level',
                editor: {
                    allowBlank: false,
                    blankText: '级别不能为空',
                    maxLength: 5,
                    maxLengthText: '级别最多{0}位'
                }
            }, {
                header: '金额',
                align: 'right',
                xtype:'templatecolumn', 
                tpl: '{amount}元',
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
                text: '添加薪资等级',
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
        var rec = new Yihua.model.SalaryLevel({
            group: '管理人员',
            level: '',
            amount: 0
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
        Ext.Msg.confirm('确认', '确认删除【'+rec.get('group') + '-' +rec.get('level') +'】?', function(btn){
            if( btn === 'yes' ) {
                me.getStore().removeAt(rowIndex);
                console.log(rec);
            }
        });
    }
});