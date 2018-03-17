Ext.define('Yihua.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',

    constructor: function(config) {
        var me = this;

        me.callParent([Ext.apply({
            root: {
                text: '系统导航',
                id: 'all',
                expanded: true,
                children: me.getNavItems()
            }
        }, config)]);
    },

    addIconClasses: function (items) {
        for (var item, i = items.length; i-- > 0; ) {
            item = items[i];

            item.iconCls = 'fa fa-' + item.iconCls;
            // if (!('iconCls' in item)) {
            //     item.iconCls = 'icon-' + item.id;
            // }

            // if (!('glyph' in item)) {
            //     // sets the font-family
            //     item.glyph = '32@Sencha-Examples';
            // }

            if (item.children) {
                this.addIconClasses(item.children);
            }
        }

        return items;
    },

    getNavItems: function() {
        return this.addIconClasses([
            { id: 'yihua-home', iconCls: 'home', text: '屹华主页', leaf: true },
            {
                text: '我的屹华',
                id: 'my',
                iconCls: 'user',
                expanded: true,
                children: [
                    { id: 'my-profile', iconCls: 'list', text: '个人信息', leaf: true },
                    { id: 'my-password', iconCls: 'key', text: '修改密码', leaf: true },
                    { id: 'my-leave', iconCls: 'plane', text: '我的假期', leaf: true },
                    { id: 'my-structure', iconCls: 'sitemap', text: '组织架构图', leaf: true }
                ]
            },
            {
                text: '基础数据',
                id: 'setting',
                iconCls: 'cog',
                expanded: true,
                children: [
                    { id: 'setting-role-group', iconCls: 'cubes', text: '一二级岗位', leaf: true },
                    { id: 'setting-role', iconCls: 'cube', text: '三级岗位', leaf: true },
                    { id: 'setting-permission', iconCls: 'lock', text: '权限设置', leaf: true },
                    { id: 'setting-salary-level', iconCls: 'rmb', text: '薪资级别', leaf: true },
                    { id: 'setting-broadcast', iconCls: 'bullhorn', text: '公告管理', leaf: true }
                ]
            },
            {
                text: '人力资源',
                id: 'hr',
                iconCls: 'list',
                expanded: true,
                children: [
                    {
                        id: 'hr-staff',
                        expanded: false,
                        text: '员工信息',
                        iconCls: 'list-ol',
                        children: [
                            {id: 'hr-overview', iconCls: 'sitemap', text: '员工总览', leaf: true },
                            {id: 'grids', iconCls: 'users', text: '员工列表', leaf: true },
                            {id: 'hr-staff-info', iconCls: 'user', text: '员工资料', leaf: true }
                        ]
                    },
                    { id: 'hr-external-staff', text: '挂靠信息', iconCls: 'user-secret', leaf: true },
                    {
                        id: 'hr-leaves-admin',
                        expanded: false,
                        text: '假期管理',
                        iconCls: 'list-ul',
                        leaf: false,
                        children: [
                            {id: 'hr-leave-approve', iconCls: 'check', text: '假期审批', leaf: true },
                            {id: 'hr-leave-statistic', iconCls: 'table', text: '假期统计', leaf: true }
                        ]
                    }
                ]
            }
        ]);
    }
});
