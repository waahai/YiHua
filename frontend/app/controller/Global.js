Ext.define('Yihua.controller.Global', {
    extend: 'Ext.app.Controller',
    namespace: 'Yihua',
    requires: [
        'Ext.window.*'
    ],

    stores: [
        'Thumbnails'
    ],

    config: {
        control: {
            'navigation-tree': {
                selectionchange: 'onTreeNavSelectionChange'
            },
            'thumbnails': {
                itemclick: 'onThumbnailClick',
                itemdblclick: 'onThumbnailClick'
            }
        },
        refs: {
            viewport: 'viewport',
            navigationTree: 'navigation-tree',
            contentPanel: 'contentPanel',
            thumbnails: {
                selector: 'thumbnails',
                xtype: 'thumbnails',
                autoCreate: true
            }
        },
        routes  : {
            ':id': {
                action: 'handleRoute',
                before: 'beforeHandleRoute'
            }
        }
    },

    beforeHandleRoute: function(id, action) {
        var me = this,
            node = Ext.StoreMgr.get('navigation').getNodeById(id);

        if( this.getViewport().getLayout().activeItem.id != 'card-main' ) {
            action.stop();
            return;
        }

        if (node) {
            //resume action
            action.resume();
        } else {
            Ext.Msg.alert(
                '错误',
                '你访问的页面不存在',
                function() {
                    me.redirectTo('all');
                }
            );
            
            //stop action
            action.stop();
        }
    },

    handleRoute: function(id) {
        var me = this;
        var navigationTree = me.getNavigationTree(),
            store = Ext.StoreMgr.get('navigation'),
            node = store.getNodeById(id),
            contentPanel = me.getContentPanel(),
            profileName = Ext.profileName,
            thumbnails = me.getThumbnails(),
            hasTree = navigationTree && navigationTree.isVisible(),
            cmp, className, ViewClass, clsProto, thumbnailsStore;

        Ext.suspendLayouts();

        if (node.isLeaf()) {

            if (thumbnails.ownerCt) {
                contentPanel && contentPanel.remove(thumbnails, false); // remove thumbnail view without destroying
            } else {
                contentPanel && contentPanel.removeAll(true);
            }

            className = Ext.ClassManager.getNameByAlias('widget.' + id);
            ViewClass = Ext.ClassManager.get(className);
            clsProto = ViewClass.prototype;

            if (clsProto.profiles) {
                clsProto.profileInfo = clsProto.profiles[profileName];

                if (profileName === 'gray') {
                    clsProto.profileInfo = Ext.applyIf(clsProto.profileInfo || {}, clsProto.profiles.classic);
                } else if (profileName !== 'neptune' && profileName !== 'classic') {
                    if (profileName === 'crisp-touch') {
                        clsProto.profileInfo = Ext.applyIf(clsProto.profileInfo || {}, clsProto.profiles['neptune-touch']);
                    }
                    clsProto.profileInfo = Ext.applyIf(clsProto.profileInfo || {}, clsProto.profiles.neptune);
                }
                // <debug warn>
                // Sometimes we forget to include allowances for other profiles, so issue a warning as a reminder.
                if (!clsProto.profileInfo) {
                    Ext.log.warn ( 'Example \'' + className + '\' lacks a profile specification for the selected profile: \'' +
                        profileName + '\'. Is this intentional?');
                }
                // </debug>
            }

            cmp = new ViewClass();

            contentPanel.add(cmp);

            this.updateTitle(node);

            Ext.resumeLayouts(true);

            if (cmp.floating) {
                cmp.show();
            }
        } else {
            thumbnailsStore = me.getThumbnailsStore();
            thumbnailsStore.removeAll();
            thumbnailsStore.add(node.childNodes);
            if (!thumbnails.ownerCt) {
                contentPanel.removeAll(true);
            }
            contentPanel.add(thumbnails);
            this.updateTitle(node);
            Ext.resumeLayouts(true);
        }

        // Keep focus available and selections synchronized.
        // If navigation was through thumbnails, the view will have hidden and focus will go to document
        if (hasTree) {
            if (node.isRoot()) {
                navigationTree.ensureVisible(0, {
                    focus: true
                });
            } else {
                navigationTree.expandNode(node);
                navigationTree.ensureVisible(node, {
                    focus: true,
                    select: true
                });
            }
        }
    },
    
    updateTitle: function(node) {
        var text = node.get('text'),
            title = node.isLeaf() ? (node.parentNode.get('text') + ' - ' + text) : text,
            contentPanel = this.getContentPanel();

        if (contentPanel.setTitle) {
            contentPanel.setTitle(title);
        }

        document.title = document.title.split(' - ')[0] + ' - ' + text;
    },

    onTreeNavSelectionChange: function(selModel, records) {
        var record = records[0];
        // Ignore the initialize to the "all" node.
        if (record && !record.isRoot()) {
            this.redirectTo(record.getId());
        }
    },

    onThumbnailClick: function(view, node, item, index, e) {
        // Update the selectedView in the ViewModel.
        // Both navigation views are bound to this, so whichever is visible, tree or breadcrumb
        // will fire its selectionchange.
        this.getViewport().getViewModel().set('selectedView', node);
    }
});
