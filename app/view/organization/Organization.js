
Ext.define('qron.view.organization.Organization',{
    extend: 'Ext.panel.Panel',

    requires: [
        'qron.view.organization.OrganizationController',
        'qron.view.organization.OrganizationModel'
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

    layout:'border',
    
    items:[
        {
            xtype:'panel',
            region:'west',
            width:'50%',
            border:false,
            split:true
        },
        {
            xtype:'grid',
            region:'center',
            border:false,
            store: Ext.create('Ext.data.ArrayStore', {
                // store configs
                storeId: 'myStore',
                // reader configs
                fields: [
                   'company',
                   {name: 'price', type: 'float'},
                   {name: 'change', type: 'float'},
                   {name: 'pctChange', type: 'float'},
                   {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
                ]
            }),
            columns:[
                { text: 'Name',  dataIndex: 'name', width: 200 },
                { text: 'Email', dataIndex: 'email', width: 250 },
                { text: 'Phone', dataIndex: 'phone', width: 120 }
            ],
            bbar:[
                {
                    xtype: 'pagingtoolbar',
                    border:false,
                    displayInfo: true
                }
            ],
            tbar:[
                {
                    xtype:'button',
                    text:'Add',
                    iconCls:'add',
                    handler: function() {

                    }
                },
                {
                    xtype:'button',
                    text:'Edit',
                    iconCls:'edit',
                    handler: function() {
                        
                    }
                },
                {
                    xtype:'button',
                    text:'Delete',
                    iconCls:'delete',
                    handler: function() {
                        
                    }
                }
            ]
        }
    ]
});
