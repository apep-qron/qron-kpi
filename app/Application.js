/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('qron.Application', {
    extend: 'Ext.app.Application',

    name: 'qron',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    ls: '',
<<<<<<< HEAD
=======

    requires:[
        'Ext.*'
    ],
    
    init: function(){
        this.ls = new SecureLS({
            encodingType: 'aes',
            encryptionSecret: CONFIG.app.key,
            isCompression: false
        });
    },

>>>>>>> 9c31b5281d02a8da256a2fe2700d3f68598621fc
    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        // TODO - Launch the application
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
