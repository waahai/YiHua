Ext.define('Yihua.view.hr.StaffDetailFormWindow', {
    extend: 'Ext.window.Window',
    xtype: 'staff-detail-form',
    
    reference: 'staff-detail-form',
    
    bind: {
        title: '{title}'
    },
    layout: 'fit',
    modal: true,
    width: 680,
    height: 480,
    scrollable: false,
    closable: true,

    items: {
        xtype: 'form',
        reference: 'form',
        bodyPadding: 10,
        border: false,
        scrollable: true,
        // use the Model's validations for displaying form errors
        modelValidation: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'fieldset',
            title: '基本信息',
            iconCls: 'fa fa-user',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                msgTarget: 'side'
            },
            items: [
                {fieldLabel: '工号', name: 'username'},
                {fieldLabel: '姓名', name: 'name'},
                {
                    fieldLabel: '性别',
                    xtype: 'combobox',
                    name: 'gender',
                    forceSelection: true,
                    editable: false,
                    triggerAction: 'all',
                    queryMode: 'local',
                    store: Yihua.Util.enums.genders
                }, {
                    xtype: 'datefield',
                    fieldLabel: '出生日期', 
                    name: 'birthday',
                    format: 'Y-m-d'
                }, {
                    xtype: 'numberfield',
                    hideTrigger: true,
                    fieldLabel: '手机', 
                    name: 'mobile'
                }, {
                    fieldLabel: '办公电话', 
                    name: 'telephone'
                }, {
                    fieldLabel: '邮件', 
                    email: true,
                    name: 'email'
                }, {
                    fieldLabel: '身份证号', 
                    email: true,
                    name: 'identity'
                }, {
                    fieldLabel: '备注', 
                    xtype : 'textareafield',
                    grow  : true,
                    name: 'comment'
                }
            ]
        }, {
            xtype: 'fieldset',
            title: '教育信息',
            iconCls: 'fa fa-list',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                msgTarget: 'side'
            },
            items: [{
                fieldLabel: '教育背景',
                xtype: 'combobox',
                name: 'education',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                queryMode: 'local',
                store: Yihua.Util.enums.educations
            }, {
                fieldLabel: '毕业学校', 
                name: 'graduate_from'
            }, {
                fieldLabel: '学校专业', 
                name: 'field'
            }, {
                xtype: 'datefield',
                fieldLabel: '毕业日期', 
                name: 'graduate_at',
                format: 'Y-m-d'
            }]
        }, {
            xtype: 'fieldset',
            title: '专业背景',
            iconCls: 'fa fa-list',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                msgTarget: 'side'
            },
            items: [{
                fieldLabel: '职称',
                xtype: 'combobox',
                name: 'title',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                queryMode: 'local',
                store: Yihua.Util.enums.titles
            }, {
                fieldLabel: '注册职称',
                xtype: 'combobox',
                name: 'registed_title',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                queryMode: 'local',
                store: Yihua.Util.enums.registed_titles
            }, {
                xtype: 'datefield',
                fieldLabel: '职称评定日', 
                name: 'registed_at',
                format: 'Y-m-d'
            }, {
                xtype: 'datefield',
                fieldLabel: '职称提醒日', 
                name: 'promotion_alert_at',
                format: 'Y-m-d'
            }]
        }, {
            xtype: 'fieldset',
            title: '聘任信息',
            iconCls: 'fa fa-list',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                msgTarget: 'side'
            },
            items: [{
                fieldLabel: '聘任专业',
                xtype: 'combobox',
                name: 'hired_field',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                queryMode: 'local',
                store: Yihua.Util.enums.hired_fields
            }, {
                fieldLabel: '员工状态',
                xtype: 'combobox',
                name: 'status',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                queryMode: 'local',
                store: Yihua.Util.enums.statuses
            }, {
                xtype: 'datefield',
                fieldLabel: '入职时间', 
                name: 'onboard_at',
                format: 'Y-m-d'
            }, {
                xtype: 'datefield',
                fieldLabel: '离职时间', 
                name: 'resign_at',
                format: 'Y-m-d'
            }, {
                fieldLabel: '在岗状态',
                xtype: 'combobox',
                name: 'work_status',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                queryMode: 'local',
                store: Yihua.Util.enums.work_statuses
            }, {
                xtype: 'datefield',
                fieldLabel: '转正日期', 
                name: 'regular_at',
                format: 'Y-m-d'
            }, {
                xtype: 'datefield',
                fieldLabel: '合同到期日', 
                name: 'contract_to',
                format: 'Y-m-d'
            }, {
                fieldLabel: '岗位',
                xtype: 'combobox',
                name: 'role_id',
                reference: 'role',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'remote'
            }, {
                fieldLabel: '兼任岗位',
                xtype: 'combobox',
                name: 'snd_role_id',
                reference: 'snd_role',
                forceSelection: true,
                editable: false,
                triggerAction: 'all',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'remote'
            }, {
                fieldLabel: '薪资等级',
                xtype: 'combobox',
                name: 'salary_level_id',
                forceSelection: true,
                reference: 'salary_level',
                editable: false,
                triggerAction: 'all',
                displayField: 'display',
                valueField: 'id',
                queryMode: 'remote'
            }]
        }],
        buttons: [{
            text: '保存',
            formBind: true,
            handler: 'onSaveClick'
        }, {
            text: '取消',
            handler: 'onCancelClick'
        }]
    }
});