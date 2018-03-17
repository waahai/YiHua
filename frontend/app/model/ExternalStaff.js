Ext.define('Yihua.model.ExternalStaff', {
    extend: 'Ext.data.Model',

    requires: [
        "Yihua.model.field.MobileNumber"
    ],

    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'education', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'registed_title', type: 'string'},
        {name: 'hired_field', type: 'string'},
        {name: 'contract_to', type: 'date'},
        {name: 'gender', type: 'string'},
        {name: 'identity', type: 'string'},
        {name: 'mobile', type: 'mobilenumber'},
        {name: 'email', type: 'string'},
        {name: 'graduate_from', type: 'string'},
        {name: 'field', type: 'string'},
        {name: 'graduate_at', type: 'date'},
        {name: 'hired_at', type: 'date'},
        {name: 'contract_at', type: 'date'},
        {name: 'comment', type: 'string'},
        {name: 'birthday', type: 'date'}
    ],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.HR.ExternalStaff.create',
            read:    'Server.HR.ExternalStaff.read',
            update:  'Server.HR.ExternalStaff.update',
            destroy: 'Server.HR.ExternalStaff.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});