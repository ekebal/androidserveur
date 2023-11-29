const Router = require('../../router');
const HighlightsggggController = require('../../../controllers/highlightsggggController');

module.exports = class HighlightsggggRouter extends Router{
    public constructor(routePath, app, controller = null) {
        super(routePath, app, new HighlightsggggController());
  }

  get routes(){
    return[
         
        {
            method:'get',
            path:'/api/highlights/getTopPosts',
            action:'getTopPosts'
        },              
        {
            method:'get',
            path:'/api/highlights/getBestContributor',
            action:'getBestContributor'
        },              
        {
            method:'get',
            path:'/api/highlights/getBestIdea',
            action:'getBestIdea'
        }             
    ];
  }
}
