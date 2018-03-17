Ext.define('Yihua.view.hr.LeaveStatistic', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Yihua.view.hr.LeaveStatisticController',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*'
    ],

    xtype: 'hr-leave-statistic',
    controller: 'leave-statistic',

    title: 'Leave Statistic',
    header: false,

    initComponent: function() {

        var lss = Ext.create('Ext.data.Store', {
            model: 'Yihua.model.LeaveStatisticItem',
            remoteFilter: true,
            autoLoad: false
        });

        var daysRender = function(v) {
            return v ? v : '-';
        }

        Ext.apply(this, {
                store: lss,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items:[{
                        xtype: 'datefield',
                        reference: 'filterFrom',
                        allowBlank: false,
                        emptyText: '开始时间',
                        format: 'Y-m-d'
                    }, {
                        xtype: 'datefield',
                        reference: 'filterTo',
                        allowBlank: false,
                        emptyText: '结束时间',
                        format: 'Y-m-d'
                    }, {
                        xtype: 'button',
                        handler: 'onSearch',
                        text: '搜索'
                    }]
                }, {
                    html: '提示: 点击单行可查看详细信息',
                    margin: 10,
                    dock: 'bottom'
                }],
                columns: [{
                    xtype: 'rownumberer'
                }, {
                    header: '工号',
                    dataIndex: 'username'
                }, {
                    header: '员工',
                    flex: 1,
                    dataIndex: 'name'
                }, {
                    header: '年假',
                    dataIndex: 'al',
                    renderer: daysRender
                }, {
                    header: '事假',
                    dataIndex: 'tl',
                    renderer: daysRender
                }, {
                    header: '病假',
                    dataIndex: 'sl',
                    renderer: daysRender
                }, {
                    header: '婚假',
                    dataIndex: 'ml',
                    renderer: daysRender
                }, {
                    header: '产假',
                    dataIndex: 'pl',
                    renderer: daysRender
                }, {
                    header: '丧假',
                    dataIndex: 'bl',
                    renderer: daysRender
                }, {
                    header: '外勤',
                    dataIndex: 'wo',
                    renderer: daysRender
                }]
        });

        this.callParent();
    },

    listeners: {
        afterlayout: {
            delay: 1,
            single: true,
            fn: 'loadStore'
        },
        itemclick: 'onItemSelect'
    }
});
