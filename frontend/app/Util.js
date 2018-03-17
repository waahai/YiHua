function repeatElement(arr) {
	var ret_arr = [];
	for(var idx in arr) {
		ret_arr.push([ arr[idx], arr[idx] ]);
	}
	return ret_arr;
}

Ext.define('Yihua.Util', {
	singleton: true,

	enums: {
		leave_types: repeatElement(['年假','事假','病假','婚假','产假','丧假','外勤']),
		statuses: repeatElement(['在职', '离职']),
		genders: repeatElement(['男','女']),
		titles: repeatElement(['初级','中级','副高','正高','其它']),
		registed_titles: repeatElement([
			'一级建筑师',
			'二级建筑师',
			'一级结构工程师',
			'二级结构工程师',
			'注册电气工程师',
			'注册排水工程师',
			'注册暖通工程师',
			'其它'
		]),
		educations: repeatElement(['本科四年','本科五年','大专', '研究生','博士', '其它']),
		hired_fields: repeatElement(['建筑', '结构', '电气', '给排水', '暖通', '其它']),
		work_statuses: repeatElement(['试用', '实习', '兼职', '返聘', '正式'])
	},

    toast: function(msg) {
    	Ext.toast({
            html: msg,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 200
        });
    },

    success: function() {
    	Yihua.Util.toast('保存成功');
    },

    failure: function(record, operation) {
        var exception = operation.getError();
        Ext.Msg.alert('保存失败', exception.errors);
    }
});