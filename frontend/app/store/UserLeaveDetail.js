Ext.define('Yihua.store.UserLeaveDetail', {
    extend: 'Ext.data.Store',

    alias: 'store.user-leave-detail',

    model: 'Yihua.model.Leave',

    autoLoad: false, 

    remoteSort: true, //enable remote filter

    remoteFilter: true, //enable remote sorting

    pageSize: 0,
    
    sorters: [
        { property: 'type', direction: 'ASC' },
        { property: 'from', direction: 'DESC' }
    ],

    proxy: {
        type: 'direct',
        directFn: 'Server.HR.LeaveStatistic.detail',
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});
