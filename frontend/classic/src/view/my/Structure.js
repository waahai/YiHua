Ext.define( 'Yihua.view.my.Structure', {
    extend: 'Ext.tree.Panel',
    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Yihua.model.Structure'
    ],

    xtype: 'my-structure',
    
    reserveScrollbar: true,
    
    title: '组织架构图',
    header: false,

    useArrows: true,
    rootVisible: true,

    initComponent: function() {
        
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
                model: 'Yihua.model.Structure',
                root: {
	                text: '屹华建筑'
                }
            }),
            tbar: [{
                text: '展开全部',
                iconCls: 'fa fa-folder-open icon-green',
                scope: this,
                handler: this.expandAll
            }],
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: '层级',
                flex: 1,
                sortable: true,
                dataIndex: 'text'
            },{
                text: '人数合计',
                dataIndex: 'headcount',
                sortable: true
            },{
                text: '用户列表',
                tdCls: 'multiline-text',
                flex: 3,
                dataIndex: 'users',
                renderer: function(v) {
                	v = v || [];
                	// for( var idx in v ) {
                	// 	var el = '<span class="label label-default">' + v[idx] + '</span>';
                	// }
                	return v.join(', ');
                }
            }]
        });

        this.callParent();

        this.on('afterrender', function(){
        	this.getStore().getRoot().expand();
        }, this, {single: true});
    }
});