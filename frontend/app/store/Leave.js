Ext.define('Yihua.store.Leave', {
    extend: 'Ext.data.Store',

    alias: 'store.leave',

    model: 'Yihua.model.Leave',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.

    remoteSort: true, //enable remote filter

    remoteFilter: true, //enable remote sorting

    sorters: [{
        property: 'from',
        direction: 'DESC'
    }],

    pageSize: Yihua.Setting.pageSize,
    
    proxy: {
        type: 'direct',
        api: {
            create:  'Server.My.Leave.create',
            read:    'Server.My.Leave.read',
            update:  'Server.My.Leave.update',
            destroy: 'Server.My.Leave.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});
