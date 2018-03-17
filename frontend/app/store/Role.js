Ext.define('Yihua.store.Role', {
    extend: 'Ext.data.Store',

    alias: 'store.role',

    model: 'Yihua.model.Role',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.

    remoteSort: true, //enable remote filter

    remoteFilter: true, //enable remote sorting

    pageSize: 0

});
