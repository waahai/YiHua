Ext.define('Yihua.store.LeaveApprovor', {
    extend: 'Ext.data.Store',

    alias: 'store.leave-approvor',

    model: 'Yihua.model.User',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.

    pageSize: 0,
    
    proxy: {
        type: 'direct',
        directFn: 'Server.HR.LeaveApprovor.read',
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});
