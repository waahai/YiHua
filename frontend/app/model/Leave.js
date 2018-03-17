/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.Leave', {
    extend: 'Ext.data.Model',

    fields: ['id', 'type', 
        {name:'from', type: 'date', dateWriteFormat: 'Y-m-d H:m:s' },
        {name:'to', type: 'date', dateWriteFormat: 'Y-m-d H:m:s' },
        {name:'approvor_id', reference: 'Yihua.model.User'},
        {name:'snd_approvor_id', reference: 'Yihua.model.User'},
        {name:'user_id', reference: 'Yihua.model.User'},
        'status', 'snd_status'
    ]
});