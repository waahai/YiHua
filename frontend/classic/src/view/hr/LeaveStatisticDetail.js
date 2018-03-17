Ext.define('Yihua.view.hr.LeaveStatisticDetail', {
    extend: 'Ext.window.Window',
    xtype: 'leave-statistic-detail',
    
    reference: 'leave-statistic-detail',

    requires: [
        'Ext.grid.feature.Grouping',
        'Yihua.store.UserLeaveDetail'
    ],

    title: '假期详情',
    width: 650,
    height: 380,
    minWidth: 650,
    minHeight: 380,
    layout: 'fit',
    resizable: true,
    modal: true,
    closeAction: 'hide',

    items: [
    // {
    //     html: 'hello'
    // }
    // ,
    {
        xtype: 'grid',
        collapsible: true,
        header: false,
        // store: new Yihua.store.UserLeaveDetail(),
        store: 'UserLeaveDetail',
        // features: [{
        //     ftype: 'grouping',
        //     groupHeaderTpl: '{name}: 共{rows.length}次',
        //     hideGroupedHeader: true,
        //     startCollapsed: true,
        //     id: 'leaveTypeGrouping'
        // }],
        columns: [{
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
        }]
        // dockedItems: [{
        //     xtype: 'toolbar',
        //     ui: 'footer',
        //     dock: 'top',
        //     items: ['->', {
        //         text:'清除分组',
        //         iconCls: 'fa fa-list',
        //         scope: this,
        //         handler: this.onClearGroupingClick
        //     }]
        // }],
        // initComponent: function() {
        //     var ulds = new Yihua.store.UserLeaveDetail();
        //     // ulds.load();
        //     Ext.apply(this, {
        //         store: ulds
        //     });
        // }
        // initComponent: function() {

        //     this.callParent();

        //     var store = this.getStore();
        //     console.log(this);
        //     this.groupingFeature = this.features[0];

        //     this.mon(this, {
        //         groupcollapse: this.onGroupCollapse,
        //         groupexpand: this.onGroupExpand,
        //         scope: this
        //     });
        // },

        // onClearGroupingClick: function(){
        //     this.groupingFeature.disable();
        // },

        // toggleGroup: function(item) {
        //     var groupName = item.text;
        //     if (item.checked) {
        //         this.groupingFeature.expand(groupName, true);
        //     } else {
        //         this.groupingFeature.collapse(groupName, true);
        //     }
        // },

        // onGroupCollapse: function(v, n, groupName) {
        //     if (!this.down('[text=Toggle groups...]').disabled) {
        //         this.down('menucheckitem[text=' + groupName + ']').setChecked(false, true);
        //     }
        // },

        // onGroupExpand: function(v, n, groupName) {
        //     if (!this.down('[text=Toggle groups...]').disabled) {
        //         this.down('menucheckitem[text=' + groupName + ']').setChecked(true, true);
        //     }
        // }
    }
    ],

    buttons: [{
        text: '确定',
        handler: function() {
            this.up('window').hide();
        }
    }]
});