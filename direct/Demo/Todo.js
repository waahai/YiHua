
var Todo  = {
    create: function(params, callback){
        delete params['id'];
        callback();
    },

    //callback as last argument is mandatory
    read: function(params, callback){

    },

    update: function(params, callback){
            callback();
    },

    destroy: function(params, callback){
            callback();
    }
};

module.exports = Todo;