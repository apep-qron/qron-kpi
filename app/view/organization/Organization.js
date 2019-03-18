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
            region: 'center',
            layout:'fit',
            border:false,
            id:'org-tree-chart-panel',
            html:'<div id="orgchart-pnl" style="height:100%; width:100%; background: #EEE;"></div>',
            loader: {
                loadMask: {
                    msg    : 'Loadeing...'
                },
                url: CONFIG.endPointApi + 'v1/organizations',
                renderer: 'data',
                ajaxOptions : {
                    cors: true,
                    useDefaultXhrHeader: false
                },
                headers: {
                    'Authorization': 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                },
                success: function(c,response){
                    
                    var resp = Ext.JSON.decode(response.responseText);
                    resp.name = 'Organization';
                    
                    $('#org-tree-chart-panel-body').orgchart({
                        'pan': true,
                        'zoom': true,
                        'data' : resp,
                        'collapsed': false,
                        'nodeContent': 'name',
                        'createNode': function($node, data) {
                          $node.on('click', function(event) {
                            if (!$(event.target).is('.edge, .toggleBtn')) {
                                //var $this = $(this);
                                //var $chart = $this.closest('.orgchart');
                                //var newX = window.parseInt(($chart.outerWidth(true)/2) - ($this.offset().left - $chart.offset().left) - ($this.outerWidth(true)/2));
                                //var newY = window.parseInt(($chart.outerHeight(true)/2) - ($this.offset().top - $chart.offset().top) - ($this.outerHeight(true)/2));
                                //$chart.css('transform', 'matrix(1, 0, 0, 1, ' + newX + ', ' + newY + ')');

                                var $doc = $(document);
                                var centerX = $doc.width() / 2;
                                var centerY = $doc.height() / 2;
                                var $card = $(this);
                                var origX = $card.data('orig-x');
                                var origY = $card.data('orig-y');
                                $(this).transition({
                                    x: centerX,
                                    y: centerY
                                });
                              }                          
                          });
                        }
                      });
                }
            },
            listeners: {
                render: function () {
                    this.getLoader().load();
                }
            }
        },
        {
            xtype: 'treepanel',
            region: 'west',
            width: '30%',
            border: false,
            split: true,
            id:'org-tree-grid',
            useArrows: true,
            rootVisible: false,
            viewConfig:{
                loadMask:false
            },
            store: Ext.create('Ext.data.TreeStore', {
                model: 'OrgTreeModel',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    cors: true,
                    useDefaultXhrHeader: false,
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
                                                success: function() {
                                                    win.close();
                                                    Ext.getCmp('org-tree-grid').store.load();
                                                    Ext.getCmp('org-tree-chart-panel').getLoader().load();
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
                        var sel = Ext.getCmp('org-tree-grid').getSelection();
                        
                        if(sel.length === 1) {

                            var data = sel.map(rec => {
                                var id = rec.get('id');

                                var win = Ext.create('Ext.Window', {
                                    title: 'Edit Organization',
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
                                                        method:'PUT',
                                                        url: CONFIG.endPointApi + 'v1/organizations/edit',
                                                        headers: {
                                                            'Authorization': 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                                                        },
                                                        success: function() {
                                                            win.close();
                                                            Ext.getCmp('org-tree-grid').store.load();
                                                            Ext.getCmp('org-tree-chart-panel').getLoader().load();
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
        
                                Ext.getCmp('frm-org').getForm().load({
                                    method:'GET',
                                    waitMsg: 'Wait....',
                                    url: CONFIG.endPointApi + 'v1/organizations/loadById?id=' + id,
                                    headers: {
                                        'Authorization': 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                                    },
                                    success: function(c,response) {
                                        var obj = Ext.JSON.decode(response.response.responseText);
                                        var parent = obj.data.parent;
                                        
                                    }
                                });
                            });

                        }
                        
                    }
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    iconCls: 'delete',
                    handler: function () {

                        Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(val){
                            if(val === 'yes') {
                                var sel = Ext.getCmp('org-tree-grid').getSelection();
                        
                                if(sel.length === 1) {

                                    var data = sel.map(rec => {
                                        var id = rec.get('id');

                                        Ext.Ajax.request({
                                            url: CONFIG.endPointApi + 'v1/organizations/delete?id=' + id,
                                            method:'DELETE',
                                            headers: {
                                                'Authorization': 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                                            },
                                            success: function(response){
                                                Ext.getCmp('org-tree-grid').store.load();
                                                Ext.getCmp('org-tree-chart-panel').getLoader().load();
                                            }
                                        });
                                    });
                                }
                            }
                        });

                        
                    }
                }
            ]
        }
    ]
});