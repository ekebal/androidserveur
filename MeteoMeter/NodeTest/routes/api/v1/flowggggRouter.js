const Router = require('../../router');
const FlowggggController = require('../../../controllers/flowggggController');

module.exports = class FlowggggRouter extends Router{
    public constructor(routePath, app, controller = null) {
        super(routePath, app, new FlowggggController());
  }

  get routes(){
    return[
         
        {
            method:'get',
            path:'/api/flow/list/v1/:idUser',
            action:'list'
        }             
    ];
  }
}
