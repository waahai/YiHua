/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.Permission', {
    extend: 'Ext.data.Model',

    fields: ['id', 'name'],

    proxy: {
        type: 'direct',
        directFn: 'Server.Setting.Permission.read',
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});