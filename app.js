/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'qron',

    extend: 'qron.Application',

    requires: [
        'qron.view.main.Main'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'qron.view.main.Main'
    //mainView: 'qron.view.login.Login'
    launch : function () {
        var test = 2;
        //Ext.Msg.alert('Test','Ok');
        //this.getView('qron.view.main.Main').create();
        if(test == 1){
            Ext.create('qron.view.login.Login');
            //this.setMainView('qron.view.login.Login');
        }
        if(test == 2){
            this.setMainView('qron.view.main.Main');
        }

    }

    //-------------------------------------------------------------------------
    // Most customizations should be made to qron.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
