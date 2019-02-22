
Ext.define('qron.view.login.Login',{
    extend: 'Ext.window.Window',

    requires: [
        'qron.view.login.LoginController',
        'qron.view.login.LoginModel',
        'Ext.form.Panel'
    ],

    controller: 'login-login',
    viewModel: {
        type: 'login-login'
    },
    bodyPadding: 5,
    reference : 'qronFormLoginWindow',
    title: 'Login Window',
    draggable: false,
    border: false,
    resizable: false,
    closable: false,
    autoShow: true,
    items: {
        xtype: 'form',
        border: false,
        reference: 'form',
        bodyPadding: 5,
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false
        }],
        bbar: ['->',{
            text: 'Login',
            formBind: true,
            iconCls: 'login',
            listeners: {
                click: 'doLogin'
            }
        }]
    }
});
