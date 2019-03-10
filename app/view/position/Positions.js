
Ext.define('qron.view.position.Positions',{
    extend: 'Ext.grid.Panel',

    requires: [
        'qron.view.position.PositionsController',
        'qron.view.position.PositionsModel',
        'qron.view.position.PositionForm'
    ],

    reference: 'mainPositionTabPanel',

    title: 'Positions',
    closable: true,
    border: false,
    iconCls: 'Positions',

    controller: 'positions-positions',
    viewModel: {
        type: 'positions-positions'
    },

    columns:[
        {
            xtype:'treecolumn',
            text:'Name',
            dateIndex:'name'
        }
    ],

    store: Ext.create('Ext.data.Store', {
        fields: [
            {name: 'name', type: 'string'}
        ],
        proxy: {
            type: 'rest',
            appendId:false,
            cors: true,
            useDefaultXhrHeader : false,
            url: CONFIG.endPointApi + 'v1/position',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'total',
                idProperty: 'id'
            },
            headers: {
                'Authorization' : 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
            }
        },
        autoLoad: true
    }),

    tbar:[
        {
            xtype:'button',
            text:'Add',
            iconCls:'add',
            handler: function() {
                var win = Ext.create('Ext.Window',{
                    title:'Add Position',
                    width:400,
                    modal:true,
                    constrain:true,
                    resizable:false,
                    bodyStyle:'border:none;background:transparent;',
                    items:[
                        Ext.create('qron.view.position.PositionForm')
                    ],
                    buttons:[
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            id: 'btn-edit-frm-position',
                            iconCls: 'save',
                            handler: function(c) {
                                var frm = Ext.getCmp('frm-position').getForm();
                                
                                if(frm.isValid()) {
                                    frm.submit({
                                        url: CONFIG.endPointApi + 'v1/position/add',
                                        headers: {
                                            'Authorization' : 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                                        }
                                    });
                                }
                            }
                        }, {
                            xtype: 'button',
                            text: 'Cancel',
                            iconCls: 'cancel',
                            id: 'btn-cancel-frm-position',
                            handler: function() {
                                win.close();
                            }
                        }
                    ]
                }).show();
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
});
