//Use this override to enable CORS with credentials.
Ext.define('Yihua.override.data.Connection', {
    override: 'Ext.data.Connection',
    config:{
        withCredentials: true,
        cors: true
    }
});