const Router = require('../../router');
const IdeaggggController = require('../../../controllers/ideaggggController');

module.exports = class IdeaggggRouter extends Router{
    public constructor(routePath, app, controller = null) {
        super(routePath, app, new IdeaggggController());
  }

  get routes(){
    return[
         
        {
            method:'get',
            path:'/api/idea/listIdea',
            action:'list'
        },              
        {
            method:'delete',
            path:'/api/idea/delete/v1/:idIdea',
            action:'delete'
        },              
        {
            method:'put',
            path:'/api/idea/updateIdea/v1/:idea',
            action:'update'
        },              
        {
            method:'post',
            path:'/api/idea/create/v1/:idea',
            action:'create'
        }             
    ];
  }
}
