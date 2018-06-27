const RouterBase = require('./routerBase');
const AccountController = require('../controllers/accountController');

module.exports = class AccountRouter extends RouterBase {
    constructor(routePath, app, passport, controller = null){
        super(routePath, app, new AccountController());
        this._passport = passport;

        this.initLoginRoute();
    }

    get routes(){
        return [
            { method:'get', path:'/register', action:'register' },

            { method:'post', path:'/register', action:'saveRegister' },

            { method:'get', path:'/login', action:'login' },

            { method:'all', path:'/logout', action:'doLogout' },

            { method: 'get', path: '/changePassword', action: 'changePassword' },

            { method: 'post', path: '/changePassword/:id', action: 'updatePassword' },

            { method: 'get', path: '/forgotPassword', action: 'forgotPassword' },

            { method: 'post', path: '/sendNewPassword', action: 'sendNewPassword' }
        ];
    }

    initLoginRoute() {
        this.app.post(this.routePath + '/login', this._passport.authenticate('local', {
            successRedirect: '/home/index',
            failureRedirect: '/'
        }));
    }
}
