/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('qron.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'qron.view.main.MainController',
        'qron.view.main.MainModel'
    ],

    layout: 'border',

    controller: 'main',
    viewModel: 'main',

    items: [
        {
            region: 'north',
            border: false,
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    frame: true,
                    html : '<br>Header LOGO<br><br>',
                    border: false,
                    height: '70%'
                },
                {
                    border: false,
                    height: '30%',
                    tbar : [
                        {
                            xtype:'splitbutton',
                            text:'KPI',
                            iconCls: "performances",
                            menu:[{
                                text:'Views',
                                iconCls: 'list'
                            },{
                                text:'Report',
                                iconCls: 'report'
                            }]
                        },'-',{
                            xtype:'splitbutton',
                            text:'Employee',
                            iconCls: "employee",
                            menu:[{
                                text:'Views',
                                iconCls: 'list'
                            },{
                                text: 'Report',
                                iconCls: 'report'
                            }]
                        },'-',
                        {
                            xtype:'splitbutton',
                            text:'Settings',
                            iconCls: "settings",
                            menu:[{
                                text:'Users',
                                iconCls: 'users',
                                handler: 'mainMenuUser'
                            },{
                                text: 'Position',
                                iconCls: 'position'
                            }]
                        },
                        '->',
                        {
                            iconCls: 'logout',
                            text:'Logout',
                            handler: 'logout'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            border: false,
            items: [
                {
                    xtype: 'tabpanel',
                    reference: 'qronMainTabPanel',
                    border: false,
                    items: [
                        {
                            title: 'Dashboard',
                            bind : {
                                html: '{name}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: 'Online -|-',
            region: 'south',
            resizable: false
        }
    ]
});
