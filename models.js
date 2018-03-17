/**
 * Created by waahai@gmail.com on 2016/1/20.
 */
var Sequelize = require('sequelize');
var sequelize = global.App.orm;
global.App.model = {};

var User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

global.App.model.User = User;

var Leave = sequelize.define('leave', {
    type: {
        type:   Sequelize.ENUM,
        values: ['年假', '事假', '病假', '婚假', '产假', '丧假', '外勤']
    },
    from: Sequelize.DATE,
    to: Sequelize.DATE,
    status: {
        type:   Sequelize.ENUM,
        values: ['已保存', '已提交', '审批通过', '审批拒绝']
    }
});

User.hasMany(Leave);
Leave.belongsTo(User, { as: 'auditor', constraints: false });

global.App.model.Leave = Leave;

var Item = sequelize.define('item', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING
});
global.App.model.Item = Item;

sequelize.sync({force:true}).then(function(){
    User.create({
        username: 'waahai',
        password: '123456'
    });
    var itemData = [
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
    for(var idx in itemData) {
        Item.create(itemData[idx]);
    }

}).done();

