Ext.define('Yihua.store.User', {
    extend: 'Ext.data.Store',

    alias: 'store.user',

    model: 'Yihua.model.User',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.

    pageSize: 0,
    
    proxy: {
        type: 'direct',
        api: {
            create:  'Server.HR.User.create',
            read:    'Server.HR.User.read',
            update:  'Server.HR.User.update',
            destroy: 'Server.HR.User.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});
