var table = 'broadcasts';
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var YihuaHome  = {
    load: function(params, callback, sessionID, req, res){

        var sql = 'SELECT * FROM ' + table +' ORDER BY id DESC LIMIT 2';
        db.query(sql, function(err, rows, fields) {
            if (err) {
                db.debug(err, callback);
                return false;
            }

            callback(null, rows);
        });
        
    }

};

module.exports = YihuaHome;