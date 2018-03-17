/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.LeaveStatisticItem', {
    extend: 'Ext.data.Model',

    fields: ['id', 'username', 'name', 'al','tl','sl','ml','pl','bl','wo', 'from', 'to'],

    proxy: {
        type: 'direct',
        directFn: 'Server.HR.LeaveStatistic.statistic',
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});