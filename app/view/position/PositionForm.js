Ext.define('qron.view.position.PositionForm', {
    extend: 'Ext.form.Panel',
    id: 'frm-position',
    layout:'anchor',
    padding:10,
    frame:true,               
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype:'textfield',
                fieldLabel:'Name',
                anchor:'100%',
                name:'name',
                allowBlank: false
            }
        ];

        this.callParent(arguments);
    }
});