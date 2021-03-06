Ext.define('Yihua.override.tree.Column', {
    override: 'Ext.tree.Column',
    cellTpl: [
        '<tpl for="lines">',
        '<div class="{parent.childCls} {parent.elbowCls}-img ',
        '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>" role="presentation"></div>',
        '</tpl>',
        '<div class="{childCls} {elbowCls}-img {elbowCls}',
        '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>" role="presentation"></div>',
        '<tpl if="checked !== null">',
        '<div role="button" {ariaCellCheckboxAttr}',
        ' class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"></div>',
        '</tpl>',
        '<tpl if="icon"><img src="{blankUrl}"<tpl else><div</tpl>',
        ' role="presentation" class="{childCls} {baseIconCls}',
        '<tpl if="iconCls == \'\'"> {customIconCls} ',
        '{baseIconCls}-<tpl if="leaf">leaf<tpl else><tpl if="expanded">parent-expanded<tpl else>parent</tpl></tpl></tpl> {iconCls}" ',
        '<tpl if="icon">style="background-image:url({icon})"/><tpl else>></div></tpl>',
        '<tpl if="href">',
        '<a href="{href}" role="link" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
        '<tpl else>',
        '<span class="{textCls} {childCls}">{value}</span>',
        '</tpl>'
    ]
});