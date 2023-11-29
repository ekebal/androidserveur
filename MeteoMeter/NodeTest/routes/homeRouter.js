const RouterBase = require('./routerBase');
const HomeController = require('../controllers/homeController');

module.exports = class HomeRouter extends RouterBase {
    constructor(routePath, app, passport, controller = null){
        super(routePath, app, new HomeController());
        this._passport = passport;
    }

    get routes(){
        return [
            { method:'get', path:'/index', action:'index' },

            { method:'get', path:'/dashboard', action:'dashboard' },

            { method:'get', path:'/contacts', action:'contacts' },

            { method:'get', path:'/about', action:'about' }
        ];
    }
}
