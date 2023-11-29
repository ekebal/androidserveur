const ControllerBase = require('./ControllerBase');

module.exports = class HomeController extends ControllerBase{

    index (req, res) {
        res.render('./home/index', { title: 'Home' });
    }

    dashboard(req, res) {
        res.render('./home/dashboard', { title: 'Dashboard' });
    }

    about(req, res) {        
        res.render('./home/about', { layout: 'unAutherizedLayout' });
    }

    contacts(req, res) {
        res.render('./home/contacts', { layout: 'unAutherizedLayout' });
    }
}
