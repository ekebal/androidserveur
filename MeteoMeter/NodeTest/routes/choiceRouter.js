const RouterBase = require('./routerBase');
const ChoiceController = require('../controllers/choiceController');

module.exports = class ChoiceRouter extends RouterBase{
    constructor(routePath, app, controller = null) {
        super(routePath, app, new ChoiceController());
    }

    get routes(){
        return[
            { method:'get', path: '/', action:'index' },

            { method:'get', path: '/index', action:'index' },

            { method:'get', path: '/details/:id', action:'details' },

            { method:'get', path: '/create', action:'create' },

            { method:'post', path: '/create', action:'save' },

            { method:'get', path: '/edit/:id', action:'edit' },

            { method:'post', path: '/edit/:id', action:'update' },

            { method:'get', path: '/delete/:id', action:'delete' },

            { method:'post', path: '/delete/:id', action:'deleteConfirmed'}
        ];
    }
}