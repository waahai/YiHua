Ext.define('Yihua.view.hr.ApproveLeave', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Yihua.store.User',
        'Yihua.store.LeaveToApprove'
    ],

    xtype: 'hr-leave-approve',

    title: 'My LeaveRequest List',
    header: false,

    initComponent: function() {

        var ltas = new Yihua.store.LeaveToApprove();
        var users = new Yihua.store.User();

        users.load();

        Ext.apply(this, {

            store: ltas,

            dockedItems: [{
                xtype: 'pagingtoolbar',
                reference: 'pager',
                store: ltas,   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }],

            columns: [{
                xtype: 'rownumberer'
            }, {
                header: '请假申请人',
                dataIndex: 'user_id',
                flex: 1,
                renderer:function(v){
                    if(!v) return "-";
                    return users.getById(v).get('name');
                }
            }, {
                header: '假期类型',
                dataIndex: 'type',
                flex: 1
            }, {
                header: '天数',
                dataIndex: 'from',
                renderer:function(v, cell){
                    var r = cell.record;
                    var d = Ext.Date.diff(r.get('from'), r.get('to'), 'd');
                    var h = Ext.Date.diff(r.get('from'), r.get('to'), 'h');
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
                formatter: 'date("Y-m-d H:m:s")'
            }, {
                header: '结束日期',
                dataIndex: 'to',
                width: 200,
                formatter: 'date("Y-m-d H:m:s")'
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
                width: 60,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'fa fa-check-circle icon-green',
                    tooltip: '通过申请',
                    isDisabled: function(v, r, c, item, rec) {
                        var key = rec.get('approvor_id') === Yihua.user.id ? 'status' : 'snd_status';
                        return  (rec.get(key) != '已提交');
                    },
                    scope: this,
                    handler: this.onAcceptClick
                }, {
                    iconCls: 'fa fa-minus-circle icon-red',
                    tooltip: '拒绝申请',
                    isDisabled: function(v, r, c, item, rec) {
                        var key = rec.get('approvor_id') === Yihua.user.id ? 'status' : 'snd_status';
                        return  (rec.get(key) != '已提交');
                    },
                    scope: this,
                    handler: this.onRejectClick
                }]
            }],

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

    onAcceptClick: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var key = rec.get('approvor_id') === Yihua.user.id ? 'status' : 'snd_status';
        if( rec.get(key) != '已提交' ) {
            return;
        }
        Ext.Msg.confirm('确认', '确认通过?', function(btn){
            if( btn === 'yes' ) {
                rec.set(key, '已通过');
            }
        });
    },

    onRejectClick: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var key = rec.get('approvor_id') === Yihua.user.id ? 'status' : 'snd_status';
        if( rec.get(key) != '已提交' ) {
            return;
        }
        Ext.Msg.confirm('确认', '确认通过?', function(btn){
            if( btn === 'yes' ) {
                rec.set(key, '已拒绝');
            }
        });
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
    }
});
