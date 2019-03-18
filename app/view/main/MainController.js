/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('qron.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    logout : function () {
        Ext.Msg.confirm('Warning', 'Are you sure want to exit from app ?',
            function (choice) {
                if (choice === 'yes') {
                    //do clear session here and then reload
                    localStorage.removeItem(CONFIG.app.lsName);
                    window.location.reload();
                }
            }
        );
    },

    mainMenuKpi: function () {
        //call main menu kpi
    },

    mainMenuOrganization: function () {
        //call main menu Org
    },

    mainMenuPosition: function () {
        this.loadPanel('mainPositionTabPanel','qron.view.position.Positions');
    },

    mainMenuEmployee: function () {
        this.loadPanel('mainEmployeeTabPanel','qron.view.employee.Employee');
    },

    mainMenuUser: function () {
        this.loadPanel('mainUsersTabPanel','qron.view.users.Users');
    },

    mainMenuOrg: function () {
        this.loadPanel('mainOrgTabPanel','qron.view.organization.Organization');
    },

    loadPanel: function(ref,mod) {
        var mainTabPanel = this.lookupReference('qronMainTabPanel');
        var tabItem = this.lookupReference(ref);
        if(Ext.isEmpty(tabItem)){
            var loadModule = Ext.create(mod);
            tabItem = mainTabPanel.add(loadModule);
        }

        mainTabPanel.setActiveTab(tabItem);
    }
});
