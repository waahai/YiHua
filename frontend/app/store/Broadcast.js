Ext.define('Yihua.store.Broadcast', {
    extend: 'Ext.data.Store',

    alias: 'store.broadcast',

    model: 'Yihua.model.Broadcast',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.

    remoteSort: true, //enable remote filter

    remoteFilter: true, //enable remote sorting

    sorters: [{
        property: 'created_at',
        direction: 'DESC'
    }],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.Setting.Broadcast.create',
            read:    'Server.Setting.Broadcast.read',
            update:  'Server.Setting.Broadcast.update',
            destroy: 'Server.Setting.Broadcast.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    },

    pageSize: Yihua.Setting.pageSize
});