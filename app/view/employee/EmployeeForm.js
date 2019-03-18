Ext.define('qron.view.employee.EmployeeForm', {
    extend: 'Ext.form.Panel',
    id: 'frm-employee',
    layout:'anchor',
    padding:10,
    frame:true,               
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype:'hidden',
                name:'id'
            },
            {
                xtype:'textfield',
                fieldLabel:'First Name',
                anchor:'100%',
                name:'first_name',
                allowBlank: false
            },
            {
                xtype:'textfield',
                fieldLabel:'Middle Name',
                anchor:'100%',
                name:'middle_name',
                allowBlank: false
            },
            {
                xtype:'textfield',
                fieldLabel:'Last Name',
                anchor:'100%',
                name:'last_name',
                allowBlank: false
            },
            {
                xtype:'textfield',
                fieldLabel:'Place of Birth',
                anchor:'100%',
                name:'place_of_birth',
                allowBlank: false
            },
            {
                xtype:'datefield',
                fieldLabel:'Date of Birth',
                name:'date_of_birth',
                allowBlank: false
            },
            {
                xtype:'combobox',
                fieldLabel:'Position Name',
                anchor:'100%',
                name:'position_name',
                allowBlank: false,
                store:Ext.create('Ext.data.Store', {
                    fields: [
                        'id','name'
                    ],
                    storeId:'store-cmb-positions',
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
                valueField: 'id',
                displayField: 'name'
            },
            Ext.create('app.ux.form.field.TreeComboBox', {
                fieldLabel: "Organization Name",
                name: 'parent',
                store: Ext.create('Ext.data.TreeStore', {
                    fields: [
                        {name: 'name', type: 'string'}
                    ],
                    autoLoad:true,
                    proxy: {
                        type: 'ajax',
                        url: CONFIG.endPointApi + 'v1/organizations'
                    },
                    folderSort: false
                }),
                anchor:'100%',
                queryMode: 'remote',
                valueField: 'id',
                displayField: 'name',
                anyMatch: true,
                id:'tree-cmb-org',
                allowFolderSelect: true,
                treeConfig: {
                    maxHeight: 200,
                    scrolling: true,
                    align:'start'
                }
            })
        ];

        this.callParent(arguments);
    }
});