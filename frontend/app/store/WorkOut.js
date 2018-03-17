Ext.define('Yihua.store.WorkOut', {
    extend: 'Ext.data.Store',

    alias: 'store.workout',

    model: 'Yihua.model.WorkOut',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.
    
    pageSize: Yihua.Setting.pageSize,

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.HR.WorkOut.create',
            read:    'Server.HR.WorkOut.read',
            update:  'Server.HR.WorkOut.update',
            destroy: 'Server.HR.WorkOut.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});
