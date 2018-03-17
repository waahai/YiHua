var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var LeaveApprovor  = {
    read: function(params, callback){
        var leaveApprovorPermissionMenu = 'hr-leave-approve';
        var sql = "SELECT * FROM permissions WHERE menu='"+leaveApprovorPermissionMenu+"'"
        db.query(sql, function(err, rows, fields) {
            if (err || rows.length === 0) {
                db.debug(err, callback);
                return false;
            }
            var pid = rows[0].id;
            var sql2 = "SELECT * FROM roles WHERE permission_ids like '%" + pid + "%'";
            db.query(sql2, function(err2, rows2, fields2) {
                if (err2) {
                    db.debug(err2, callback);
                    return false;
                }
                var role_ids = [];
                for(var idx in rows2){
                    var pms = rows2[idx].permission_ids.split(',');
                    for(var idy in pms) {
                        if(pms[idy] == pid) {
                            role_ids.push(rows2[idx].id);
                            break;
                        }
                    }
                }
                var sql3 = 'SELECT id, name FROM users WHERE role_id in (?) or snd_role_id in (?)';
                db.query(sql3, [role_ids, role_ids], function(err3, rows3, fields3) {
                    if (err3) {
                        db.debug(err3, callback);
                        return false;
                    }

                    callback(null, {
                        data: rows3,
                        total: rows3.length
                    });
                });
            });
        });
    }
};

module.exports = LeaveApprovor;