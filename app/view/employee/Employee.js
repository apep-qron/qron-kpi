
Ext.define('qron.view.employee.Employee',{
    extend: 'Ext.grid.Panel',

    requires: [
        'qron.view.employee.EmployeeController',
        'qron.view.employee.EmployeeModel',
        'qron.view.employee.EmployeeForm'
    ],

    reference: 'mainPositionTabPanel',

    title: 'Employee',
    closable: true,
    border: false,
    iconCls: 'Employee',

    controller: 'employee-employee',
    viewModel: {
        type: 'employee-employee'
    },
    
    iconCls: "employee",

    viewConfig:{
        loadMask:false
    },

    columns:[
        {
            text:'First Name',
            dateIndex:'first_name',
            flex: 1
        },
        {
            text:'Middle Name',
            dateIndex:'middle_name',
            flex: 1
        },
        {
            text:'Last Name',
            dateIndex:'last_name',
            flex: 1
        },
        {
            text:'Place Of Birth',
            dateIndex:'place_of_birth',
            flex: 1
        },
        {
            text:'Date Of Birth',
            dateIndex:'date_of_birth',
            width:150
        },
        {
            text:'Position Name',
            dateIndex:'position_name',
            flex: 1
        },
        {
            text:'Organization Name',
            dateIndex:'organization_name',
            flex: 1
        }
    ],

    id:'grid-employee',

    store: Ext.create('Ext.data.Store', {
        storeId:'store-employee',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'first_name', type: 'string'},
            {name: 'middle_name', type: 'string'},
            {name: 'last_name', type: 'string'},
            {name: 'place_of_birth', type: 'string'},
            {name: 'date_of_birth', type: 'string'},
            {name: 'position_name', type: 'string'},
            {name: 'organization_name', type: 'string'}
        ],
        proxy: {
            type: 'rest',
            appendId:false,
            cors: true,
            useDefaultXhrHeader : false,
            url: CONFIG.endPointApi + 'v1/employee',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'total',
                idProperty: 'id'
            }
        },
        autoLoad: true
    }),
    bbar:[{
        xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('store-employee'),
        border:false,
        displayInfo: true
    }],
    tbar:[
        {
            xtype:'button',
            text:'Add',
            iconCls:'add',
            handler: function() {
                var win = Ext.create('Ext.Window',{
                    title:'Add Employee',
                    width:400,
                    modal:true,
                    constrain:true,
                    resizable:false,
                    bodyStyle:'border:none;background:transparent;',
                    items:[
                        Ext.create('qron.view.employee.EmployeeForm')
                    ],
                    buttons:[
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            id: 'btn-edit-frm-employee',
                            iconCls: 'save',
                            handler: function(c) {
                                var frm = Ext.getCmp('frm-employee').getForm();
                                
                                if(frm.isValid()) {
                                    frm.submit({
                                        url: CONFIG.endPointApi + 'v1/employee/add',
                                        success: function() {
                                            Ext.Msg.alert('Success', 'Successfully Save Data.', Ext.emptyFn);
                                            win.close();
                                            Ext.data.StoreManager.lookup('store-employee').load();
                                        }
                                    });
                                }
                            }
                        }, {
                            xtype: 'button',
                            text: 'Cancel',
                            iconCls: 'cancel',
                            id: 'btn-cancel-frm-employee',
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
                var sel = Ext.getCmp('grid-employee').getSelection();
                        
                    if(sel.length === 1) {

                        var data = sel.map(rec => {
                            var id = rec.get('id');

                            var win = Ext.create('Ext.Window',{
                                title:'Edit Employee',
                                width:400,
                                modal:true,
                                constrain:true,
                                resizable:false,
                                bodyStyle:'border:none;background:transparent;',
                                items:[
                                    Ext.create('qron.view.employee.EmployeeForm')
                                ],
                                buttons:[
                                    '->',
                                    {
                                        xtype: 'button',
                                        text: 'Save',
                                        id: 'btn-edit-frm-employee',
                                        iconCls: 'save',
                                        handler: function(c) {
                                            var frm = Ext.getCmp('frm-employee').getForm();
                                            
                                            if(frm.isValid()) {
                                                frm.submit({
                                                    method:'PUT',
                                                    url: CONFIG.endPointApi + 'v1/employee/edit',
                                                    success: function() {
                                                        win.close();
                                                        Ext.data.StoreManager.lookup('store-employee').load();
                                                    }
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'button',
                                        text: 'Cancel',
                                        iconCls: 'cancel',
                                        id: 'btn-cancel-frm-employee',
                                        handler: function() {
                                            win.close();
                                        }
                                    }
                                ]
                            }).show();

                            Ext.getCmp('frm-employee').getForm().load({
                                method:'GET',
                                url: CONFIG.endPointApi + 'v1/employee/loadById?id=' + id,
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
                        var sel = Ext.getCmp('grid-employee').getSelection();
                
                        if(sel.length === 1) {

                            var data = sel.map(rec => {
                                var id = rec.get('id');

                                Ext.Ajax.request({
                                    url: CONFIG.endPointApi + 'v1/employee/delete?id=' + id,
                                    method:'DELETE',
                                    success: function(response){
                                        Ext.getCmp('grid-employee').store.load();
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
