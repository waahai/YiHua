/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Yihua.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Yihua',

    requires: [
        'Ext.app.*',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Yihua.DirectAPI',
        'Yihua.*'
    ],

    controllers: ['Global'], 


    models: ['Broadcast',
        'LeaveStatisticItem',
        'Role',
        'Structure',
        'ExternalStaff',
        'ListItem',
        'RoleGroup',
        'User',
        'ExternalStaffExp',
        'Permission',
        'RolePermission',
        'WorkOut',
        'Leave',
        'SalaryLevel'],

    stores: ['Broadcast',
        'LeaveToApprove',
        'Role',
        'UserLeaveDetail',
        'DemoList',
        'Navigation',
        'RoleGroup',
        'WorkOut',
        'ExternalStaff',
        'PagedUser',
        'SalaryLevel',
        'Leave',
        'PublicBroadcast',
        'Thumbnails',
        'LeaveApprovor',
        'User'],

    views: [ 'demo.List',
        'home.BroadcastDetailFormWindow',
        'home.WorkoutDetailFormWindow',
        'home.WorkOut',
        'home.YihuaHome',
        'hr.ApproveLeave',
        'hr.LeaveStatistic',
        'hr.StaffList',
        'hr.ExternalStaff',
        'hr.LeaveStatisticDetail',
        'hr.ExternalStaffFormWindow',
        'hr.StaffDetailFormWindow',
        'login.Login',
        'main.Main',
        'my.Leave',
        'my.Password',
        'my.Profile',
        'my.Structure',
        'navigation.Tree',
        'setting.Broadcast',
        'setting.Permission',
        'setting.RoleGroup',
        'setting.BroadcastFormWindow',
        'setting.Role',
        'setting.SalaryLevel',
        'thumbnails.Thumbnails'],

    init: function () {
        Ext.create('Yihua.store.Navigation', {
            storeId: 'navigation'
        });
    },

    launch: function () {
        if(Yihua.DirectError){
            Ext.Msg.alert('服务器通信错误', Yihua.DirectError.message);
        } else {
            Ext.create({ xtype: 'app-main' });
        }
    },

    onAppUpdate: function () {
        window.location.reload();
    }
});
