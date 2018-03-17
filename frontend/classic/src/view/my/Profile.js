/**
 * This view is an example list of people.
 */
Ext.define('Yihua.view.my.Profile', {
    extend:'Ext.form.Panel',
    xtype: 'my-profile',

    title: '我的信息',
    header: false,

    controller: 'my-profile',

    layout: 'column',
    scrollable: true,
    // bind: {
    //     user: {}
    // },
    // fieldDefaults: {
    //     padding: 0
    // },

    items: [{
        xtype: 'panel',
        columnWidth: 0.5,
        margin: 10,
        items: [{
            xtype: 'fieldset',
            title: '基本信息',
            iconCls: 'fa fa-user',
            defaultType: 'displayfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {fieldLabel: '工号', name: 'username'},
                {fieldLabel: '姓名', name: 'name'},
                {fieldLabel: '性别', name: 'gender'},
                {fieldLabel: '出生时间', name: 'birthday'},
                {fieldLabel: '证件号码', name: 'identity'},
                {fieldLabel: '手机', name: 'mobile'},
                {fieldLabel: '邮箱', name: 'email'},
                {fieldLabel: '办公电话', name: 'telephone'},
                {fieldLabel: '员工备注', name: 'comment'}
            ]
        }, {
            xtype: 'fieldset',
            title: '教育信息',
            iconCls: 'fa fa-graduation-cap',
            defaultType: 'displayfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {fieldLabel: '教育背景', name: 'education'},
                {fieldLabel: '毕业学校', name: 'graduate_from'},
                {fieldLabel: '毕业日期', name: 'graduate_at'},
                {fieldLabel: '学校专业', name: 'field'}
            ]
        }]
    }, {
        xtype: 'panel',
        columnWidth: 0.5,
        margin: 10,
        items: [{
            xtype: 'fieldset',
            title: '职务信息',
            iconCls: 'fa fa-list',
            defaultType: 'displayfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {fieldLabel: '聘任专业', name: 'hired_field'},
                {fieldLabel: '职称', name: 'title'},
                {fieldLabel: '注册职称', name: 'registed_title'},
                {fieldLabel: '职称评定日期', name: 'registed_at'},
                {fieldLabel: '职称提醒日', name: 'promotion_alert_at'},
                {fieldLabel: '上层领导', name: 'manager'},
                {fieldLabel: '员工状态', name: 'status'},
                {fieldLabel: '聘任状态', name: 'work_status'},
                {fieldLabel: '入职时间', name: 'onboard_at'},
                {fieldLabel: '转正日期', name: 'regular_at'},
                {fieldLabel: '合同期限', name: 'contract_to'},
                {fieldLabel: '离职时间', name: 'resign_at'},
                {fieldLabel: '岗位', name: 'role'},
                {fieldLabel: '薪资等级', name: 'salary_level'},
                {fieldLabel: '兼任岗位', name: 'snd_role'}
            ]
        }
        // , {
        //     xtype: 'gridpanel',
        //     title: '职务变动记录',
        //     iconCls: 'fa fa-bars',
        //     columns: [
        //         {xtype: 'rownumberer'},
        //         { text: '日期',  dataIndex: 'type' },
        //         { text: '职务', dataIndex: 'from', flex: 1 },
        //         { text: '备注', dataIndex: 'no', flex: 1 }
        //     ]
        // }, {
        //     xtype: 'gridpanel',
        //     title: '工作经历',
        //     iconCls: 'fa fa-bars',
        //     columns: [
        //         {xtype: 'rownumberer'},
        //         { text: '开始',  dataIndex: 'type' },
        //         { text: '结束',  dataIndex: 'type' },
        //         { text: '公司', dataIndex: 'from', flex: 1 },
        //         { text: '职务', dataIndex: 'no', flex: 1 }
        //     ]
        // }
        ]
    }]
});
