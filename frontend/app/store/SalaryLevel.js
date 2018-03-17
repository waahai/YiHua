Ext.define('Yihua.store.SalaryLevel', {
    extend: 'Ext.data.Store',

    alias: 'store.salarylevel',

    model: 'Yihua.model.SalaryLevel',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.

    remoteSort: true, //enable remote filter

    remoteFilter: true, //enable remote sorting

    pageSize: 0
});
