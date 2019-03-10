Ext.define('OrgTreeModel', {
    extend: 'Ext.data.TreeModel',
    fields: [{
        name: 'name',
        type: 'string'
    }]
});

Ext.define('qron.view.organization.Organization', {
    extend: 'Ext.panel.Panel',

    requires: [
        'qron.view.organization.OrganizationController',
        'qron.view.organization.OrganizationModel',
        'qron.view.organization.OrganizationForm'
    ],

    reference: 'mainOrgTabPanel',

    title: 'Organization',
    closable: true,
    border: false,
    iconCls: 'org',

    controller: 'organization-organization',
    viewModel: {
        type: 'organization-organization'
    },

    layout: 'border',

    items: [{
            xtype: 'panel',
            region: 'west',
            width: '50%',
            border: false,
            split: true,
            layout:'fit',
            id:'org-tree-chart-panel',
            html:'<div id="orgchart-pnl"></div>',
            listeners: {
                render: function () {

                    Ext.Ajax.request({
                        url: CONFIG.endPointApi + 'v1/organizations',
                        method:'GET',
                        headers: {
                            'Authorization': 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                        },
                        success: function(response){
                            var resp = Ext.JSON.decode(response.responseText);
                            resp.name = 'Organization';
                            $('#orgchart-pnl').orgchart({
                                'pan': true,
                                'data' : resp,
                                'nodeContent': 'name',
                                'createNode': function($node, data) {
                                  $node.on('click', function(event) {
                                    
                                  });
                                }
                              });
                        }
                    });

                    
                }
            }
        },
        {
            xtype: 'treepanel',
            region: 'center',
            border: false,
            collapsible: true,
            id:'org-tree-grid',
            useArrows: true,
            rootVisible: false,
            store: Ext.create('Ext.data.TreeStore', {
                model: 'OrgTreeModel',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: CONFIG.endPointApi + 'v1/organizations',
                    headers: {
                        'Authorization': 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                    }
                },
                folderSort: false
            }),

            columns: [{
                xtype: 'treecolumn',
                text: 'Name',
                dataIndex: 'name',
                flex: 1,
                align: 'left'
            }],
            tbar: [{
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'add',
                    handler: function () {
                        var win = Ext.create('Ext.Window', {
                            title: 'Add Organization',
                            width: 400,
                            modal: true,
                            constrain: true,
                            resizable: false,
                            bodyStyle: 'border:none;background:transparent;',
                            items: [
                                Ext.create('qron.view.organization.OrganizationForm')
                            ],
                            buttons: [
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'Save',
                                    id: 'btn-edit-frm-org',
                                    iconCls: 'save',
                                    handler: function (c) {
                                        var frm = Ext.getCmp('frm-org').getForm();

                                        if (frm.isValid()) {
                                            frm.submit({
                                                url: CONFIG.endPointApi + 'v1/organizations/add',
                                                headers: {
                                                    'Authorization': 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                                                },
                                                callback: function() {
                                                    win.close();
                                                    Ext.getCmp('org-tree-grid').store.load();
                                                    Ext.getCmp('org-tree-chart-panel').fireEvent('render');
                                                }
                                            });
                                        }
                                    }
                                }, {
                                    xtype: 'button',
                                    text: 'Cancel',
                                    iconCls: 'cancel',
                                    id: 'btn-cancel-frm-org',
                                    handler: function () {
                                        win.close();
                                    }
                                }
                            ]
                        }).show();
                    }
                },
                {
                    xtype: 'button',
                    text: 'Edit',
                    iconCls: 'edit',
                    handler: function () {

                    }
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    iconCls: 'delete',
                    handler: function () {

                    }
                }
            ]
        }
    ]
});