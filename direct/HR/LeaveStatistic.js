var moment = require('moment');
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var LeaveStatistic  = {
    statistic: function(params, callback, sessionID, req, res){
        var user = req.session.user,
            from = moment().subtract(1, 'month').format('YYYY-MM-DD 00:00:00'),
            to = moment().format('YYYY-MM-DD 23:59:59');

        if(params.filter) {
            for(var idx in params.filter) {
                if( params.filter[idx].property === 'from' ) {
                    from = params.filter[idx].value;
                }
                if( params.filter[idx].property === 'to' ) {
                    to = params.filter[idx].value;
                }
            }
        }

        var sql = ["SELECT u.id, u.username, u.name, l.type, sum(dateDIFF(l.`to`, l.`from`)) 'days'",
                    'FROM yihua.leave_requests l, yihua.users u',
                    "WHERE l.status = '已通过'",
                        "AND l.snd_status = '已通过'",
                        'AND l.approvor_id = ' + user.id,
                        'AND  l.user_id = u.id',
                        "AND  l.from > '" + from + "'",
                        "AND  l.from < '" + to + "'",
                    'GROUP BY u.id, u.username, u.name, l.type',
                    'ORDER BY u.id'].join(' ');
        db.query(sql, function(err, rows, fields) {
            if (err) {
                db.debug(err, callback);
                return false;
            }
            var data = [];
            var dataMap = {};
            var typeMap = {
                '年假': 'al',
                '事假': 'tl',
                '病假': 'sl',
                '婚假': 'ml',
                '产假': 'pl',
                '丧假': 'bl',
                '外勤': 'wo'
            };
            for( var idx in rows ) {
                var row = rows[idx];
                var type = typeMap[row.type];
                if( dataMap[row.id] === undefined ) {
                    dataMap[row.id] = {};
                    dataMap[row.id].id = row.id;
                    dataMap[row.id].username = row.username;
                    dataMap[row.id].name = row.name;
                    dataMap[row.id].from = from;
                    dataMap[row.id].to = to;
                }
                dataMap[row.id][type] = row.days;
            }
            for( var idy in dataMap ) {
                data.push(dataMap[idy]);
            }
            callback(null, {
                data: data,
                total: data.length
            });
        });
    },
    detail: function(params, callback, sessionID, req, res){
        params = params instanceof Array ? params : [params];
        for(var idx in params) {
            params[idx].filter = params[idx].filter || [];
            params[idx].filter.push({
                property: 'approvor_id',
                value: req.session.user.id
            });
            params[idx].filter.push({
                property: 'status',
                value: '已通过'
            });
            params[idx].filter.push({
                property: 'snd_status',
                value: '已通过'
            });
        }
        commonAPI.read(db, 'leave_requests', params, callback);
    }
};

module.exports = LeaveStatistic;