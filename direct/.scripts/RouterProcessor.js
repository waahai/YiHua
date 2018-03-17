var RouterProcessor  = {

    beforeTransaction: function(req, res, callback) {
        //Implement any logic that should be carried prior to execution
        //Example: open database connection
        // console.log('before');

        // console.log(req.body.action);

        if( req.body.action != 'Auth.Login') {
            if (!req.session.authenticated) {
                callback(null, {
                    message: '需要登录才能执行该操作',
                    success: false
                });
                return false;
            }
            // 权限校验?
            callback();
        } else {
            callback();
        }
        //var appDB = global.App.database;
        //
        //appDB.connect();


    },

    afterTransaction: function(req, res, batch, callback) {
        //Implement any logic that should be carried after to execution
        //Example: close database connection
        // console.log('after', batch);

        //global.App.database.disconnect(); //release connection

        callback(null, batch);
    }
};

module.exports = RouterProcessor;
