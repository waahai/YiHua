/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.SalaryLevel', {
    extend: 'Ext.data.Model',

    fields: ['id','group', 'level', 'amount', {
        name: 'display', mapping: function(r) {
            return r.group + '-' + r.level + ' ('+r.amount+')';
        }
    }],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.Setting.SalaryLevel.create',
            read:    'Server.Setting.SalaryLevel.read',
            update:  'Server.Setting.SalaryLevel.update',
            destroy: 'Server.Setting.SalaryLevel.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});