Ext.define('qron.view.organization.OrganizationForm', {
    extend: 'Ext.form.Panel',
    id: 'frm-org',
    layout:'anchor',
    padding:10,
    frame:true,
    requires:[
        'app.ux.form.field.TreeComboBox'
    ], 
    initComponent: function() {
        var me = this;

        var treestore = Ext.create('Ext.data.TreeStore', {
            fields: [
                {name: 'name', type: 'string'}
            ],
            autoLoad:true,
            proxy: {
                type: 'ajax',
                url: CONFIG.endPointApi + 'v1/organizations',
                headers: {
                    'Authorization' : 'Bearer ' + Ext.JSON.decode(localStorage['qronkpiusertoken']).token
                }
            },
            folderSort: false
        });

        this.items = [
            {
                xtype:'hidden',
                name:'id'
            },
            {
                xtype:'textfield',
                fieldLabel:'Name',
                anchor:'100%',
                name:'name',
                allowBlank: false
            },
            Ext.create('app.ux.form.field.TreeComboBox', {
                fieldLabel: "Parent",
                name: 'parent',
                store: treestore,
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