Ext.define('qron.controller.Application', {
    extend: 'Ext.app.Controller',

    ls: '',

    init: function() {
        this.ls = new SecureLS({
            encodingType: 'aes',
            encryptionSecret: CONFIG.app.key,
            isCompression: false
        });
    },

    saveToken: function (token) {
        this.ls.set(CONFIG.app.lsName, token);
    },

    clearToken: function () {
        this.ls.removeAll(CONFIG.app.lsName);
    },

    getTokenFromLocalStorage: function () {
        return this.ls.get(CONFIG.app.lsName);
    }
});