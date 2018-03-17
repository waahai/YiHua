/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.RolePermission', {
    extend: 'Ext.data.Model',

    fields: ['id',
        {name:'permisson_id', reference: 'Yihua.model.Permission'}, 
        {name:'role_id', reference: 'Yihua.model.Role'}
    ],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.Setting.RolePermission.create',
            read:    'Server.Setting.RolePermission.read',
            update:  'Server.Setting.RolePermission.update',
            destroy: 'Server.Setting.RolePermission.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});