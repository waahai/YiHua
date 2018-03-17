Ext.define('Yihua.view.login.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'login',
    
    title: '请输入用户名和密码登录系统',
    frame: true,
    width: 320,
    bodyPadding: 10,
    
    defaultType: 'textfield',

    items: [{
        name: 'username',
        fieldLabel: '用户名',
        blankText: '用户名不能为空',
        allowBlank: false,
        listeners: {
            specialkey: 'onKey'
        }
    }, {
        name: 'password',
        inputType: 'password',
        fieldLabel: '密码',
        minLength: 4,
        minLengthText: '密码至少{0}位',
        maxLength: 32,
        maxLengthText: '密码最多{0}位',
        blankText: '密码不能为空',
        allowBlank: false,
        listeners: {
            specialkey: 'onKey'
        }
    }],
    
    buttons: [{
        text: '登录',
        formBind: true,
        listeners: { click: 'onLogin' }
    }],
    
    initComponent: function() {
        this.defaults = {
            anchor: '100%',
            labelWidth: 120
        };
        
        this.callParent();
    }
});