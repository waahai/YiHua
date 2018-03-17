/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Yihua.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    init: function() {
        var me = this,
            refs = me.getReferences();
        
        Server.Auth.Login.checkLogin({},
            function(result, event) {
                if(result.auth) {
                    var store = Ext.StoreMgr.get('navigation');
                    store.setRoot(result.data.perm);
                    Yihua.user = result.data.user;
                    me.getView().getLayout().setActiveItem(2);
                    // console.log(me.getToken());
                    me.redirectTo('all', true);
                } else {
                    me.getView().getLayout().setActiveItem(1);
                }
            }
        );
    },

    onKey: function(field, e){
        if (e.getKey() == e.ENTER) {
            this.onLogin();
        }
    },

    onLogin: function() {

        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.
        var me = this;
        var refs = this.getReferences();

        if(!refs.loginForm.isValid()) {
            return;
        }

        formdata = refs.loginForm.getValues();
        formdata.password = Yihua.util.MD5.decode(formdata.password);

        Server.Auth.Login.login(formdata,
            function(result, event) {
                if(result.auth === true) {
                    var store = Ext.StoreMgr.get('navigation');
                    store.setRoot(result.data.perm);
                    Yihua.user = result.data.user;
                    me.getView().getLayout().setActiveItem(2);
                    me.redirectTo('all', true);
                } else {
                    Ext.Msg.alert('登录失败', result.message);
                }
            }
        );
    },

    onLogout: function () {
        var me = this;
        Server.Auth.Login.logout({},
            function(result, event) {
                if(result.auth === false) {
                    delete Yihua['user'];
                    me.getView().getLayout().setActiveItem(1);
                } else {
                    Ext.Msg.alert('退出失败', Ext.encode(result));
                }
            }
        );
    },

    treeNavNodeRenderer: function(value) {
        return value;
    },

    getToken: function() {
        var token = Ext.History.getToken();
        if( token === '' || token === null) {
            token='all';
        }
        return token;
    }

});
