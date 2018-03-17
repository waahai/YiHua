Ext.define('Yihua.model.Structure', {
    extend: 'Ext.data.TreeModel',
    
    fields: ['text', 'headcount', 'users'],

    proxy: {
        type: 'direct',
        directFn: 'Server.My.Structure.read'
    }
});