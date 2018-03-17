Ext.define('Yihua.view.home.WorkoutDetailFormWindow', {
    extend: 'Ext.window.Window',
    xtype: 'workout-detail-form',

    layout: 'vbox',
    modal: true,
    width: 600,
    height: 500,
    scrollable: true,
    closable: true,
    layout: 'fit',
    bind: {
        title: '{title}'
    },
    
    items: [{
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        bodyPadding: 10,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="不能为空">*</span>'
            ],
            allowBlank: false,
            labelStyle: 'font-weight:bold'
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: '事由',
            itemId: 'reason',
            name: 'reason'
        }, {
            xtype: 'textfield',
            fieldLabel: '去向',
            itemId: 'place',
            name: 'place'
        }, {
            xtype: 'datetimefield',
            fieldLabel: '开始时间',
            format: 'Y-m-d H:m:s',
            itemId: 'from',
            name: 'from'
        }, {
            xtype: 'datetimefield',
            fieldLabel: '结束时间',
            format: 'Y-m-d H:m:s',
            itemId: 'to',
            name: 'to'
        }, {
            xtype: 'tagfield',
            fieldLabel: '参与人员',
            itemId: 'user_ids',
            name: 'user_ids',
            displayField: 'name',
            valueField: 'id',
            queryMode: 'remote'
        }],

        buttons: [{
            text: '取消',
            handler: function() {
                this.up('form').getForm().reset();
                this.up('window').hide();
            }
        }, {
            text: '保存',
            formBind: true,
            handler: 'onSaveWorkout'
        }]
    }]
});