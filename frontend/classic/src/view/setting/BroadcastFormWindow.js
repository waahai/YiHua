Ext.define('Yihua.view.setting.BroadcastFormWindow', {
    extend: 'Ext.window.Window',
    xtype: 'setting-broadcast-form',
    
    reference: 'broadcast-form-window',
    
    title: '添加新通知',
    width: 650,
    height: 380,
    minWidth: 650,
    minHeight: 380,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'title',
    closeAction: 'hide',
    
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
            labelStyle: 'font-weight:bold'
        },
        
        items: [{
            xtype: 'textfield',
            fieldLabel: '通知标题',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="不能为空">*</span>'
            ],
            itemId: 'title',
            name: 'title',
            allowBlank: false
        }, {
            xtype: 'htmleditor',
            fieldLabel: '通知内容',
            fieldBodyCls: 'broadcast-editor',
            enableFont: false,
            enableSourceEdit: false,
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="不能为空">*</span>'
            ],
            name: 'body',
            allowBlank: false
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
            handler: 'onFormSave'
        }]
    }]
});