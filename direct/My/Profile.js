var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var Profile  = {
    load: function(params, callback, sessionID, req, res){
        if(!req.session.authenticated) {
            return false;
        }
        var user = req.session.user;
        callback(null, {
            message: '加载成功',
            data: {
                user: user
            },
            success: true
        });
        // if( user.password != params.oldProfile ) {
        //     callback(null, {
        //         message: '当前密码错误',
        //         success: false
        //     });
        //     return false;
        // }
        // var sql = 'UPDATE ' + table + ' SET password = ' + db.escape(params.newProfile) + ' WHERE id = ' + db.escape(user.id);
        
        // db.query(sql, function(err, result) {
        //     if (err) {
        //         db.debug(err, callback);
        //         return false;
        //     }
        //     user.password = params.newProfile;
        //     callback(null, {
        //         message: '修改成功',
        //         success: true
        //     });
        // });
    },
};

module.exports = Profile;