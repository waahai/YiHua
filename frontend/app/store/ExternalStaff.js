Ext.define('Yihua.store.ExternalStaff', {
    extend: 'Ext.data.Store',

    alias: 'store.external-staff',

    model: 'Yihua.model.ExternalStaff',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.
    remoteSort: true, //enable remote filter

    remoteFilter: true, //enable remote sorting

    pageSize: Yihua.Setting.pageSize
});
