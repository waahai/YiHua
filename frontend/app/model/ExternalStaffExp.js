Ext.define('Yihua.model.ExternalStaffExp', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'company', type: 'string'},
        {name: 'from', type: 'date'},
        {name: 'to', type: 'date'},
        {name: 'role', type: 'string'},
        {name: 'comment', type: 'string'},
        { 
            name: 'external_staff_id',
            reference: {
                parent: 'ExternalStaff'
            }
        }
    ],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.HR.ExternalStaffExp.create',
            read:    'Server.HR.ExternalStaffExp.read',
            update:    'Server.HR.ExternalStaffExp.update',
            destroy: 'Server.HR.ExternalStaffExp.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});