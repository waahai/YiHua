var model = global.App.model;

var List  = {
    //callback as last argument is mandatory
    read: function(params, callback, sessionID, req, res){
        //model.Item.findAll({ offset: params.start, limit: params.limit }).then(function(items){
        //    if (!items) {
        //        return false;
        //    }
        //    model.Item.count().then(function(total) {
        //        callback(null, {
        //            data: items,
        //            total: rowsTotal[0].totals
        //        });
        //    });
        //});
        var payload = {};
        var data = [
            { name: 'Jean Luc', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111" },
            { name: 'Worf1',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" },
            { name: 'Worf2',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" },
            { name: 'Worf3',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" },
            { name: 'Worf4',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" },
            { name: 'Deanna1',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
            { name: 'Deanna2',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
            { name: 'Deanna3',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
            { name: 'Deanna4',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
            { name: 'Deanna5',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
            { name: 'Deanna6',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
            { name: 'Deanna7',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
            { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444" }
        ];

        payload.data = data;
        payload.total = data.length;

        callback(null, payload);
    }
};

module.exports = List;