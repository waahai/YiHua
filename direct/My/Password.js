var table = 'users';
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var Password  = {
    change: function(params, callback, sessionID, req, res){
        if(!req.session.authenticated) {
            return;
        }
        var user = req.session.user;
        if( user.password != params.oldPassword ) {
            callback(null, {
                message: '当前密码错误',
                success: false
            });
            return false;
        }
        var sql = 'UPDATE ' + table + ' SET password = ' + db.escape(params.newPassword) + ' WHERE id = ' + db.escape(user.id);
        
        db.query(sql, function(err, result) {
            if (err) {
                db.debug(err, callback);
                return false;
            }
            user.password = params.newPassword;
            callback(null, {
                message: '修改成功',
                success: true
            });
        });
    },
};

module.exports = Password;