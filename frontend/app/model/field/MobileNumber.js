Ext.define('Yihua.model.field.MobileNumber', {
    extend: 'Ext.data.field.String',

    alias: 'data.field.mobilenumber',

    validators: [
        { 
            type: 'format', 
            matcher: /^1\d{10}$/,
            message: '格式为 1xxxxxxxxxx'
        }
    ]
});
