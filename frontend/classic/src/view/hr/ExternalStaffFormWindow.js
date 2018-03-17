Ext.define('Yihua.view.hr.ExternalStaffFormWindow', {
    extend: 'Ext.window.Window',
    xtype: 'external-staff-form',

    bind: {
        title: '{title}'
    },
    layout: 'fit',
    modal: true,
    width: 500,
    height: 430,
    scrollable: true,
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
                xtype: 'datefield',
                fieldLabel: '聘任日期', 
                name: 'hired_at',
                format: 'Y-m-d'
            }, {
                xtype: 'datefield',
                fieldLabel: '合同签订日', 
                name: 'contract_at',
                format: 'Y-m-d'
            }, {
                xtype: 'datefield',
                fieldLabel: '合同到期日', 
                name: 'contract_to',
                format: 'Y-m-d'
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