var mysql = require('mysql');

function async_loop(records, index, execute, callback) {
    if( index == records.length - 1 ) {
        execute(records[index], callback);
    } else {
        execute(records[index], function(){
            async_loop(records, index+1, execute, callback);
        });
    }
}

global.App.util.dataAPI = {
    permissionQuery: function(db, user, callback) {
        function renderNodes(items, depth, expanded_depth) {
            for (var item, i = items.length; i-- > 0; ) {
                item = items[i];
                item.iconCls = 'fa fa-' + item.menu_icon;
                item.id = item.menu;
                item.text = item.menu_text;
                item.leaf = item.menu_has_child ? false : true;
                if ( depth < expanded_depth ) {
                    item.expanded = true;
                }
                if (item.children) {
                    renderNodes(item.children, depth + 1, expanded_depth);
                }
            }
            return items;
        }
        function generateTree(rmap, root) {
            var treeMap = {};
            treeMap[root.id] = root;
            var found = true;
            while( found && Object.keys(rmap).length > 0 ) {
                found = false;
                for( var idx in rmap ) {
                    var el = rmap[idx],
                        node = treeMap[el.menu_parent_id];
                    if( node ) {
                        node.children = node.children || [];
                        node.children.push(el);
                        treeMap[el.id] = el;
                        delete rmap[idx];
                        found = true;
                    }
                }
            }
        }

        var sql;
        var permMap = {};
        var root = {
            text: '系统导航',
            id: 0,
            expanded: true
        };
        if( user.username === 'admin' ) {
            sql = 'SELECT *  FROM permissions WHERE disabled = 0 ORDER BY menu_order';
            db.query(sql, function(err, rows, fields) {
                if (err) {
                    callback(null);
                    return false;
                }
                
                for( var idx in rows ) {
                    var el = rows[idx];
                    permMap[el.id] = el;
                }
                generateTree(permMap, root);
                renderNodes(root.children, 1, 3);
                root.id = 'all';
                callback(root);
            });
        } else {
            sql = 'SELECT r.permission_ids FROM users u, roles r WHERE u.id = ' + user.id + ' AND  r.id IN (u.role_id, u.snd_role_id)';
            db.query(sql, function(err, rows, fields) {
                if (err) {
                    callback(null);
                    return false;
                }
                if(rows.length == 0) {
                    callback([]);
                    return false;
                }
                var perms = [];
                for( var idx in rows ) {
                    if( rows[idx].permission_ids ) {
                        perms.push(rows[idx].permission_ids);
                    }
                }
                var sql2 = 'SELECT * FROM permissions WHERE disabled = 0 AND id in (' + perms.join(',') + ')';
                db.query(sql2, function(err2, rows2, fields2) {
                    if (err2) {
                        callback(null);
                        return false;
                    }
                    
                    for( var idx in rows2 ) {
                        var el = rows2[idx];
                        permMap[el.id] = el;
                    }
                    generateTree(permMap, root);
                    renderNodes(root.children, 1, 3);
                    root.id = 'all';
                    callback(root);
                });
            });
        }
        
    },
    read: function (db, table, params, callback) {
        params = params instanceof Array ? params[0]: params;

	    var sql = 'SELECT * FROM ' + table,
            where = '';

        if(params.filter){
            params.filter = params.filter instanceof Array ? params.filter : [params.filter];
            var filters = [];
            for( var idx in params.filter ) {
                var s = params.filter[idx];
                s = s instanceof Array ? s : [s];
                var innerFilter = [];
                for( var idxx in s ) {
                    var ss = s[idxx];
                    var f = "`" + ss.property + "`";
                    if( ss.operator && ss.operator.toUpperCase() == 'IN' ) {
                        var isArray = ss.value instanceof Array;
                        if( isArray ) {
                            f += " IN (" + db.escape(ss.value) + ")";
                        } else {
                            f += " BETWEEN " + db.escape(ss.value.from) + " AND " + db.escape(ss.value.to);
                        }
                    } else {
                        if( typeof(ss.value) == 'string' ) {
                            f += " LIKE '%" + ss.value + "%'";
                        }
                        if( typeof(ss.value) == 'number' ) {
                            f += " = " + ss.value + "";
                        }
                    }
                    innerFilter.push(f);
                }
                filters.push( '(' + innerFilter.join(' OR ') + ')' );
            }
            where = " WHERE " + filters.join(' AND '); 
            sql += where;
        }

        if(params.sort){
            params.sort = params.sort instanceof Array ? params.sort : [params.sort];
            var orders = [];
            for( var idx in params.sort ) {
                var s = params.sort[idx];
                s.direction = s.direction.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                orders.push( '`' + s.property + '` ' + s.direction );
            }
            sql = sql + ' ORDER BY ' + orders.join(', ');
        }   

        // Paging
        if(params.limit) {
            if(params.start) {
                sql = sql + ' LIMIT ' + db.escape(params.start) + ' , ' + db.escape(params.limit);
            } else {
                sql = sql + ' LIMIT ' + db.escape(params.limit);
            }
        } 

        db.query(sql, function(err, rows, fields) {
            if (err) {
                db.debug(err, callback);
                return false;
            }
            // console.log(rows);
            //get totals for paging

            var totalQuery = 'SELECT count(*) as totals from ' + table + where;

            db.query(totalQuery, function(err, rowsTotal, fields) {
                if (err) {
                    db.debug(err, callback);
                    return false;
                }

                callback(null, {
                    data: rows,
                    total: rowsTotal[0].totals
                });
            });
        });
    },
    create: function(db, table, params, callback){
        params = params instanceof Array ? params : [params];

        var columns = []
        var keyMap = {};
        for(var idx in params) {
            for(var key in params[idx]) {
                if( key != 'id' && keyMap[key] === undefined ) {
                    columns.push(key);
                    keyMap[key] = true;
                }
            }
        }
        // console.log(columns);
        var values = [];
        var i = 0;
        for(var idx in params) {
            values[i] = [];
            for( var key in keyMap ) {
                if(params[idx][key] instanceof Array) {
                    params[idx][key] = params[idx][key].join(',');
                }
                values[i].push(params[idx][key]);
            }
            i++;
        }

        db.query('INSERT INTO ??(??) VALUES ?', [table, columns, values], function(err, result) {
            if (err) {
                db.debug(err, callback);
                return false;
            }
            // result.affectedRows
            callback();
        });

    },
    update: function(db, table, params, callback){
        params = params instanceof Array ? params : [params];

        function _exec(param, next) {
            for (var idx in param) {
                if(param[idx] instanceof Array) {
                    param[idx] = param[idx].join(',');
                }
            }
            db.query('UPDATE ' + table + ' SET ? where id = ' + db.escape(param['id']), param, function(err, result) {
                if (err) {
                    db.debug(err, callback);
                    return false;
                }
                next();
            });
        }

        async_loop(params, 0, _exec, callback);
    },

    destroy: function(db, table, params, callback){
        params = params instanceof Array ? params : [params];
        var ids = [];
        for(var idx in params) {
            ids.push(params[idx].id);
        }

        db.query('DELETE FROM ?? WHERE id in (?)', [table, ids], function(err, rows, fields) {
            if (err) {
                db.debug(err, callback);
                return false;
            }

            callback(null, {
                success: rows.affectedRows === params.length
            });
        });
    }
}