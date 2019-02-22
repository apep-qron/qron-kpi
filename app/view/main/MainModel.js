/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('qron.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'qron',
        apiPoint: 'http://api.qron.co.id/'
    }

    //TODO - add data, formulas and/or methods to support your view
});
