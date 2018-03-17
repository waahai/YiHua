// function workday_count(start,end) {
//   var first = start.clone().endOf('week'); // end of first week
//   var last = end.clone().startOf('week'); // start of last week
//   var days = last.diff(first,'days') * 5 / 7; // this will always multiply of 7
//   var wfirst = first.day() - start.day(); // check first week
//   if(start.day() == 0) --wfirst; // -1 if start with sunday 
//   var wlast = end.day() - last.day(); // check last week
//   if(end.day() == 6) --wlast; // -1 if end with saturday
//   return wfirst + days + wlast; // get the total
// }

Ext.define('Yihua.view.my.Leave', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.selection.CellModel',
        'Ext.ux.DateTimePicker',
        'Ext.ux.DateTimeField',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Yihua.store.Leave',
        'Yihua.store.LeaveApprovor'
    ],

    xtype: 'my-leave',

    title: 'My Leave List',
    header: false,

    store: 'Leave',
    dockedItems: [{
        html: '提示: 点击单元格可以编辑数据',
        margin: 10,
        dock: 'bottom'
    }, {
        xtype: 'pagingtoolbar',
        reference: 'pager',
        store: 'Leave',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }],

    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners: {
                beforeedit: function( editor, context, eOpts ) {
                    if(context.record.get('status')) {
                        return false;
                    }
                }
            }
        });

        var approvors = new Yihua.store.LeaveApprovor();

        approvors.load();

        this.approvors = approvors;

        Ext.apply(this, {
            plugins: [this.cellEditing],
            
            columns: [{
                xtype: 'rownumberer'
            }, {
                header: '假期类型',
                dataIndex: 'type',
                flex: 1,
                editor: new Ext.form.field.ComboBox({
                    forceSelection: true,
                    editable: false,
                    queryMode: 'local',
                    store: Yihua.Util.enums.leave_types
                })
            }, {
                header: '天数',
                dataIndex: 'from',
                renderer:function(v, cell){
                    var r = cell.record;
                    // return workday_count(r.get('from'), r.get('to'));
                    var d = Ext.Date.diff(r.get('from'), r.get('to'), 'd');
                    var h = Ext.Date.diff(r.get('from'), r.get('to'), 'h');
                    // hf = r.get('from').getHours();
                    // ht = r.get('to').getHours();
                    h %= 24;
                    if( h ) {
                        d +=  h > 12 ? 1 : 0.5;
                    }
                    return d;
                }
            }, {
                header: '开始日期',
                dataIndex: 'from',
                width: 200,
                formatter: 'date("Y-m-d H:m:s")',
                editor: {
                    xtype: 'datetimefield',
                    format: 'Y-m-d H:m:s'
                }
            }, {
                header: '结束日期',
                dataIndex: 'to',
                width: 200,
                formatter: 'date("Y-m-d H:m:s")',
                editor: {
                    xtype: 'datetimefield',
                    format: 'Y-m-d H:m:s'
                }
            }, {
                header: '审批人1',
                dataIndex: 'approvor_id',
                renderer:function(v, cell){
                    if(!v || !this.approvors.getById(v)) return "-";
                    return this.approvors.getById(v).get('name');
                },
                editor: new Ext.form.field.ComboBox({
                    forceSelection: true,
                    editable: false,
                    triggerAction: 'all',
                    displayField: 'name',
                    valueField: 'id',
                    queryMode: 'remote',
                    store: this.approvors
                })
            }, {
                header: '状态1',
                dataIndex: 'status',
                renderer:function(v){
                    if(!v) return "-";
                    if (v === '已提交') {
                        return '<span class="label label-default">已提交</span>';
                    } else if (v === '已拒绝') {
                        return '<span class="label label-danger">已拒绝</span>';
                    } else if (v === '已通过') {
                        return '<span class="label label-success">已通过</span>';
                    }
                    return v;
                }
            }, {
                header: '审批人2',
                dataIndex: 'snd_approvor_id',
                renderer:function(v, cell){
                    if(!v || !this.approvors.getById(v)) return "-";
                    return this.approvors.getById(v).get('name');
                },
                editor: new Ext.form.field.ComboBox({
                    forceSelection: true,
                    editable: false,
                    triggerAction: 'all',
                    displayField: 'name',
                    valueField: 'id',
                    queryMode: 'remote',
                    store: this.approvors
                })
            }, {
                header: '状态2',
                dataIndex: 'snd_status',
                renderer:function(v){
                    if(!v) return "-";
                    if (v === '已提交') {
                        return '<span class="label label-default">已提交</span>';
                    } else if (v === '已拒绝') {
                        return '<span class="label label-danger">已拒绝</span>';
                    } else if (v === '已通过') {
                        return '<span class="label label-success">已通过</span>';
                    }
                    return v;
                }
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'fa fa-times icon-red',
                    tooltip: '取消申请',
                    isDisabled: function(v, r, c, item, rec) {
                        return  (rec.get('status') === '已通过') 
                                || (rec.get('status') === '已拒绝')
                                || (rec.get('snd_status') === '已通过')
                                || (rec.get('snd_status') === '已拒绝');
                    },
                    scope: this,
                    handler: this.onRemoveClick
                }]
            }],
            selModel: {
                type: 'cellmodel'
            },
            tbar: [{
                text: '请假申请',
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
        var me = this;
        this.getStore().sync({
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

    onAddClick: function(){
        // Create a model instance
        var rec = new Yihua.model.Leave({
            type: '年假',
            from: new Date,
            to: new Date
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
        if( rec.get('status') === '已通过' || rec.get('status') === '已拒绝') {
            return;
        }
        Ext.Msg.confirm('确认', '确认删除?', function(btn){
            if( btn === 'yes' ) {
                me.getStore().removeAt(rowIndex);
                console.log(rec);
            }
        });
    }
});
