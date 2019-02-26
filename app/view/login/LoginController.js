Ext.define('qron.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login-login',

    doLogin: function () {
        var me = this,
            view = this.getView(),
            form = view.down('form');
        Ext.Ajax.request({
            url: CONFIG.endPointApi + '/auth/login',
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            jsonData: form.getValues(),
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.token) {
                    me.saveToken(data.token);
                    view.destroy();
                    Ext.create('qron.view.main.Main');
                }
            },
            failure: function() {
                me.clearToken();
                Ext.Msg.alert('Error','Username or Password not valid!');
            }
        });
    },

    saveToken: function (token) {
        localStorage.setItem(CONFIG.app.lsName, token);
    },

    clearToken: function () {
        localStorage.removeItem(CONFIG.app.lsName);
    }

});
