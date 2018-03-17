Ext.define('Yihua.view.my.Password', {
    extend: 'Ext.form.Panel',
    xtype: 'my-password',
    
    title: '修改密码',
    header: false,

    width: 400,
    bodyPadding: 50,
    frame: true,
    
    defaultType: 'textfield',
    fieldDefaults: {
        inputType: 'password',
        minLength: 4,
        maxLength: 32,
        allowBlank: false
    },
    
    items: [{
        name: 'oldPassword',
        fieldLabel: '当前密码',
        minLengthText: '当前密码至少{0}位',
        maxLengthText: '当前密码最多{0}位',
        blankText: '当前密码不能为空'
    }, {
        name: 'newPassword',
        fieldLabel: '新密码',
        minLengthText: '新密码至少{0}位',
        maxLengthText: '新密码最多{0}位',
        blankText: '新密码不能为空'
    }, {
        name: 'newPassword2',
        fieldLabel: '密码确认',
        minLengthText: '密码确认至少{0}位',
        maxLengthText: '密码确认最多{0}位',
        blankText: '密码确认不能为空'
    }],
    
    buttons: [{
        text: '修改',
        formBind: true,
        listeners: { 
            click: function() {
                var form = this.up('form');
                formdata = form.getForm().getValues();

                if(formdata.newPassword != formdata.newPassword2) {
                    Ext.Msg.alert('失败', '两次新密码不一致');
                    return;
                }

                formdata.oldPassword = Yihua.util.MD5.decode(formdata.oldPassword);
                formdata.newPassword = Yihua.util.MD5.decode(formdata.newPassword);

                delete formdata.newPassword2;

                Server.My.Password.change(formdata,
                    function(result, event) {
                        if(result.success === true) {
                            Ext.Msg.alert('成功', result.message);
                            form.reset();
                        } else {
                            Ext.Msg.alert('失败', result.message);
                        }
                    }
                );
            } 
        }
    }]

});