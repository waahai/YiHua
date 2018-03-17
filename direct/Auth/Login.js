var table = 'users';
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var Login  = {
    // method signature has 5 parameters
    /**
     *
     * @param params object with received parameters
     * @param callback callback function to call at the end of current method
     * @param sessionID - current session ID if "enableSessions" set to true, otherwise null
     * @param req only if "appendRequestResponseObjects" enabled
     * @param res only if "appendRequestResponseObjects" enabled
     */
    login: function(params, callback, sessionID, req, res){
        var username = params.username,
            password = params.password;

        // console.log(sessionID);
        // console.log(req);
        // console.log(res);

        /*
         You have full access to all request properties
         */

        //response.header('My-Auth-Header', '1234567890');
        /*
         Some code here to check login
         */
        var sql = 'SELECT * FROM ' + table +' WHERE username = \'' + username + '\' LIMIT 1';
        db.query(sql, function(err, rows, fields) {
            if (err) {
                db.debug(err, callback);
                return false;
            }

            var user = rows[0];
            if(user && user.password === password) {
                req.session.authenticated = true;
                req.session.user = user;
                commonAPI.permissionQuery(db, user, function(permissions){
                    // console.log(permissions);
                    if(permissions === null) {
                        callback(null, {
                            message: '服务器当前不可用',
                            success: false
                        });
                        return;
                    }
                    if(permissions.length == 0) {
                        callback(null, {
                            message: '该用户权限未分配，请联系管理员',
                            success: false
                        });
                        return;
                    }
                    callback(null, {
                        message: '登录成功',
                        auth: true,
                        success: true, // optional
                        data: {
                            perm: permissions,
                            user: user
                        }
                    });
                });

                
            } else {
                req.session.authenticated = false;

                callback(null, {
                    message: '登录失败, 请检查用户名密码后再试',
                    success: false
                });
            }
        });
        
    },

    logout: function(params, callback, sessionID, req, res){
        req.session.authenticated = false;
        req.session.user = null;

        callback(null, {
            auth: false,
            message: '退出成功'
        });
    },

    checkLogin: function(params, callback, sessionID, req, res) {
        if( req.session.authenticated ) {
            var user = req.session.user;
            commonAPI.permissionQuery(db, user, function(permissions){
                if(permissions === null) {
                    callback(null, {
                        message: '服务器当前不可用',
                        success: false
                    })
                    return;
                }
                callback(null, {
                    message: '登录成功',
                    auth: true,
                    success: true, // optional
                    data: {
                        perm: permissions,
                        user: user
                    }
                });
            });
        } else {
            callback(null, {
                auth: false,
                message: '未登录',
            });
        }
    }
};

module.exports = Login;