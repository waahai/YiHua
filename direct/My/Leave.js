var table = 'leave_requests';
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var Leave  = {
    create: function(params, callback, sessionID, req, res){
        params = params instanceof Array ? params : [params];
        for(var idx in params) {
            params[idx].user_id = req.session.user.id;
        }
        commonAPI.create(db, table, params, callback);
    },

    read: function(params, callback, sessionID, req, res){
        params = params instanceof Array ? params : [params];
        for(var idx in params) {
            params[idx].filter = params[idx].filter || [];
            params[idx].filter.push({
                property: 'user_id',
                value: req.session.user.id
            });
        }
        commonAPI.read(db, table, params, callback);
    },

    update: function(params, callback){
        commonAPI.update(db, table, params, callback);
    },

    destroy: function(params, callback){
        commonAPI.destroy(db, table, params, callback);
    }
};

module.exports = Leave;