var table = 'permissions';
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var Permission  = {
    read: function(params, callback){
    	params = params instanceof Array ? params : [params];
        for(var idx in params) {
            params[idx].filter = params[idx].filter || [];
            params[idx].filter.push({
                property: 'disabled',
                value: 0
            });
        }
        commonAPI.read(db, table, params, callback);
    }
};

module.exports = Permission;