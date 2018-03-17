/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.Role', {
    extend: 'Ext.data.Model',

    fields: ['id','name', 'order', 
        {name:'permission_ids', convert: function(v,r){
            if(!v) {
                return [];
            }
            return v instanceof Array ? v : v.split(',');
        }},
        {name:'role_group_id', reference: 'Yihua.model.RoleGroup' }
    ],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.Setting.Role.create',
            read:    'Server.Setting.Role.read',
            update:  'Server.Setting.Role.update',
            destroy: 'Server.Setting.Role.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});