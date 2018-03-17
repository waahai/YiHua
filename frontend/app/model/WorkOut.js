/**
 * Created by waahai@gmail.com on 2016/1/21.
 */
Ext.define('Yihua.model.WorkOut', {
    extend: 'Ext.data.Model',

    fields: ['id','reason', 'place', 'show', 'author_id',
    	{name:'user_ids', convert: function(v){
            if(!v) {
                return [];
            }
            return v instanceof Array ? v : v.split(',');
        }},
        {name:'from', type: 'date', dateWriteFormat: 'Y-m-d H:m:s' },
        {name:'to', type: 'date', dateWriteFormat: 'Y-m-d H:m:s' },
        {name:'created_at', type: 'date', dateWriteFormat: 'Y-m-d H:m:s' }
    ]
});