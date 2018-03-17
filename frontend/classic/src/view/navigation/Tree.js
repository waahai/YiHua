Ext.define('Yihua.view.navigation.Tree', {
    extend: 'Ext.tree.Panel',

    xtype: 'navigation-tree',
    id: 'navigation-tree',

    requires: [
        'Yihua.store.Navigation'
    ],

    title: '系统导航',
    rootVisible: false,
    lines: false,
    useArrows: true,
    hideHeaders: true,
    collapseFirst: false,
    width: 250,
    minWidth: 100,
    height: 200,
    split: true,
    stateful: true,
    stateId: 'mainnav.west',
    collapsible: true,
    
    bufferedRenderer: !Ext.platformTags.test,

    columns: [{
        xtype: 'treecolumn',
        flex: 1,
        dataIndex: 'text',
        scope: 'controller',
        renderer: 'treeNavNodeRenderer'
    }],
    bind: {
        selection: '{selectedView}'
    },

    store: 'navigation'
});
