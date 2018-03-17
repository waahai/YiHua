Ext.define('Yihua.view.my.ProfileController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.my-profile',

    init: function() {
    	var me = this;
        Server.My.Profile.load({},
            function(result, event) {
            	var user = Ext.create('Yihua.model.User', result.data.user);
                me.getView().loadRecord(user);
            }
        );
    }
});