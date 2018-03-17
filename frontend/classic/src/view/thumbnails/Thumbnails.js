Ext.define('Yihua.view.thumbnails.Thumbnails', {
    extend: 'Ext.view.View',
    xtype: 'thumbnails',
    cls: 'thumbnails',
    reference: 'contentView',
    region: 'center',
    store: 'Thumbnails',
    itemSelector: '.thumbnail-item',

    initComponent: function() {
        this.tpl =
            '<tpl for=".">' +
                '<div class="thumbnail-item">' +
                    '<div class="thumbnail-icon-wrap">' +
                        '<div class="thumbnail-icon"><i class="{iconCls}"></i></div>' +
                    '</div>' +
                    '<div class="thumbnail-text">{text}</div>' +
                '</div>' +
            '</tpl>';
        
        this.callParent();
    }
});
