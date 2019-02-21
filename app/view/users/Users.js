
Ext.define('qron.view.users.Users',{
    extend: 'Ext.panel.Panel',

    requires: [
        'qron.view.users.UsersController',
        'qron.view.users.UsersModel'
    ],

    reference: 'mainUsersTabPanel',

    title: 'Users',
    closable: true,
    border: false,
    iconCls: 'users',

    controller: 'users-users',
    viewModel: {
        type: 'users-users'
    },

    html: 'Hello, Users!!'
});
