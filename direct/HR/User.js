var table = 'users';
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var User  = {
    create: function(params, callback){
        commonAPI.create(db, table, params, callback);
    },

    read: function(params, callback){
        commonAPI.read(db, table, params, callback);
    },

    update: function(params, callback){
        commonAPI.update(db, table, params, callback);
    },

    destroy: function(params, callback){
        commonAPI.destroy(db, table, params, callback);
    }
};

module.exports = User;