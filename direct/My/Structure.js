var table = 'permissions';
var db = global.App.database.connection;
var commonAPI = global.App.util.dataAPI;

var Structure  = {
    read: function(params, callback){
    	
        var sql = "select g.type 'gtype', g.name 'gname', r.name 'rname', u.name 'uname' from roles r, users u, role_groups g where u.status='在职' and r.id = u.role_id and g.id = r.role_group_id ORDER BY g.type,g.no,r.order";
    	var sql_snd = "select g.type 'gtype', g.name 'gname', r.name 'rname', u.name 'uname' from roles r, users u, role_groups g where u.status='在职' and u.snd_role_id > 0 and r.id = u.snd_role_id and g.id = r.role_group_id ORDER BY g.type,g.no,r.order";
    	db.query(sql, function(err, rows, fields) {
            if (err) {
                db.debug(err, callback);
                return false;
            }
            db.query(sql_snd, function(err2, rows2, fields2) {
                if (err2) {
                    db.debug(err2, callback);
                    return false;
                }
                for(var idz in rows2) {
                    var el2 = rows2[idz];
                    el2.uname = '<font style="color:green">'+el2.uname+'</font>';
                    el2.snd_role = true;
                    rows.push(el2);
                }
                var gdata = [];
                var tdataMap = {};
                var gdataMap = {};
                var rdataMap = {};
                for( var idx in rows) {
                	var el = rows[idx];
                    var headCount = el.snd_role ? 0 : 1;
                	if( tdataMap[el.gtype] === undefined ) {
                		var rnode = {
                			text: el.rname,
    	            		headcount: headCount,
    	            		users: [el.uname],
    	            		leaf: true
                		}
                		rdataMap[el.rname] = rnode;
                		var gnode = {
                			text: el.gname,
                			headcount: headCount,
                			// users: [el.uname],
                			children: [rnode]
                		};
                		gdataMap[el.gname] = gnode;
                		tdataMap[el.gtype] = {
                			text: el.gtype,
                			headcount: headCount,
                			// users: [el.uname],
                			children: [gnode]
                		};
                	} else {
                		tdataMap[el.gtype].headcount += headCount;
                		// tdataMap[el.gtype].users.push(el.uname);

                		if(gdataMap[el.gname] === undefined) {
                			var rnode = {
    	            			text: el.rname,
    		            		headcount: headCount,
    		            		users: [el.uname],
    		            		leaf: true
    	            		}
    	            		rdataMap[el.rname] = rnode;
    	            		var gnode = {
    	            			text: el.gname,
    	            			headcount: headCount,
    	            			// users: [el.uname],
    	            			children: [rnode]
    	            		};
    	            		gdataMap[el.gname] = gnode;
    	            		tdataMap[el.gtype].children.push(gnode);
                		} else {
                			gdataMap[el.gname].headcount += headCount;
                			// gdataMap[el.gname].users.push(el.uname);

                			if( rdataMap[el.rname] === undefined ) {
                				var rnode = {
    		            			text: el.rname,
    			            		headcount: headCount,
    			            		users: [el.uname],
    			            		leaf: true
    		            		}
    		            		rdataMap[el.rname] = rnode;
    		            		gdataMap[el.gname].children.push(rnode);
                			} else {
                				rdataMap[el.rname].headcount += headCount;
                				rdataMap[el.rname].users.push(el.uname);
                			}
                		}
                	}
                }
                for(var idy in tdataMap) {
                	gdata.push(tdataMap[idy]);
                }
                callback(null, gdata);
            });
        });
        // callback(null, [{
	       //              text: '设计',
	       //              headcount: 2,
	       //              users: ['张三', '李四', '张三', '李四', '张三','张三', '李四', '张三', '李四', '张三', '李四', '张三', '李四', '张三', '李四', '张三', '李四', '张三', '李四', '张三', '李四', '张三', '李四', '张三', '李四'],
	       //              children: [{
		      //               text: 'cccc',
		      //               headcount: 2,
		      //               users: ['张三1', '李四4'],
		      //               leaf: true
		      //           }, {
		      //               text: 'dddd',
		      //               headcount: 2,
		      //               users: ['张三1', '李四4'],
		      //               leaf: true
		      //           }
	       //              ]
	       //          }, {
	       //              text: '管理',
	       //              headcount: 2,
	       //              users: ['张三1', '李四4'],
	       //              leaf: true
	       //          }]);
    }
};

module.exports = Structure;