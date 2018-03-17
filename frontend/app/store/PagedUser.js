Ext.define('Yihua.store.PagedUser', {
    extend: 'Yihua.store.User',

    alias: 'store.paged-user',

    remoteSort: true, //enable remote filter

    remoteFilter: true, //enable remote sorting

    pageSize: Yihua.Setting.pageSize
});
