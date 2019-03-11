
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

    viewConfig:{
        loadMask:false
    },

    columns:[
        {
            text:'Name',
            dateIndex:'name',
            flex: 1
        }
    ],

    id:'grid-position',

    store: Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
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
                var sel = Ext.getCmp('grid-position').getSelection();
                        
                    if(sel.length === 1) {

                        var data = sel.map(rec => {
                            var id = rec.get('id');

                            var win = Ext.create('Ext.Window',{
                                title:'Edit Position',
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
                                                    method:'PUT',
                                                    url: CONFIG.endPointApi + 'v1/position/edit',
                                                    success: function() {
                                                        win.close();
                                                        Ext.getCmp('grid-position').store.load();
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

                            Ext.getCmp('frm-position').getForm().load({
                                method:'GET',
                                url: CONFIG.endPointApi + 'v1/position/loadById?id=' + id,
                                success: function(c,response) {
                                   
                                }
                            });
                        });
                    }
            }
        },
        {
            xtype:'button',
            text:'Delete',
            iconCls:'delete',
            handler: function() {
                Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(val){
                    if(val === 'yes') {
                        var sel = Ext.getCmp('grid-position').getSelection();
                
                        if(sel.length === 1) {

                            var data = sel.map(rec => {
                                var id = rec.get('id');

                                Ext.Ajax.request({
                                    url: CONFIG.endPointApi + 'v1/position/delete?id=' + id,
                                    method:'DELETE',
                                    success: function(response){
                                        Ext.getCmp('grid-position').store.load();
                                    }
                                });
                            });
                        }
                    }
                });
            }
        }
    ]
});
