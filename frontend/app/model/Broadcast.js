/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.Broadcast', {
    extend: 'Ext.data.Model',

    fields: ['id','title', 'body', 'show',
        // {name:'event_at', type: 'date' },
        {name:'created_at', type: 'date', dateWriteFormat: 'Y-m-d H:m:s' },
        {name:'author_id', reference: 'Yihua.model.User' }
    ]
});