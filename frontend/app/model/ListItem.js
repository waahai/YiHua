/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.ListItem', {
    extend: 'Ext.data.Model',

    fields: ['name', 'email', 'mobile'],

    proxy: {
        type: 'direct',
        directFn: 'Server.MultiTable.read',
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});