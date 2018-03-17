var table = 'broadcasts';
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var Broadcast  = {
    create: function(params, callback, sessionID, req, res){
        params = params instanceof Array ? params : [params];
        for(var idx in params) {
            params[idx].author_id = req.session.user.id;
        }
        commonAPI.create(db, table, params, callback);
    },

    read: function(params, callback){
        commonAPI.read(db, table, params, callback);
    },

    public: function(params, callback){
        params = params instanceof Array ? params : [params];
        for(var idx in params) {
            params[idx].filter = params[idx].filter || [];
            params[idx].filter.push({
                property: 'show',
                value: '显示'
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

module.exports = Broadcast;