const Router = require('../../router');
const PostggggController = require('../../../controllers/postggggController');

module.exports = class PostggggRouter extends Router{
    public constructor(routePath, app, controller = null) {
        super(routePath, app, new PostggggController());
  }

  get routes(){
    return[
         
        {
            method:'post',
            path:'/api/post/uploadPicture/v1/:picture',
            action:'uploadPicture'
        },              
        {
            method:'get',
            path:'/api/post/getDefaultPicture',
            action:'getDefaultPicture'
        },              
        {
            method:'get',
            path:'/api/post/get/v1/:id',
            action:'get'
        },              
        {
            method:'get',
            path:'/api/post/listByUser/v1/:idUser',
            action:'getLatestsPostsByUser'
        },              
        {
            method:'put',
            path:'/api/post/update/v1/:post',
            action:'update'
        },              
        {
            method:'get',
            path:'/api/post/listTopByUser/v1/:idUser',
            action:'getTopPostsByUser'
        },              
        {
            method:'delete',
            path:'/api/post/delete/v1/:id',
            action:'delete'
        }             
    ];
  }
}
