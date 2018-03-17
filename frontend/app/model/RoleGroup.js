/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.RoleGroup', {
    extend: 'Ext.data.Model',

    fields: ['id','name', 'type', 'no'],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.Setting.RoleGroup.create',
            read:    'Server.Setting.RoleGroup.read',
            update:  'Server.Setting.RoleGroup.update',
            destroy: 'Server.Setting.RoleGroup.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});