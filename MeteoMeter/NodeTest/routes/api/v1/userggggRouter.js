const Router = require('../../router');
const UserggggController = require('../../../controllers/userggggController');

module.exports = class UserggggRouter extends Router{
    public constructor(routePath, app, controller = null) {
        super(routePath, app, new UserggggController());
  }

  get routes(){
    return[
         
        {
            method:'get',
            path:'/api/user/signIn/v1/:signIn',
            action:'signIn'
        },              
        {
            method:'get',
            path:'/api/user/get/v1/:idUser',
            action:'get'
        },              
        {
            method:'put',
            path:'/api/user/update/v1/:user',
            action:'update'
        },              
        {
            method:'get',
            path:'/api/user/list',
            action:'list'
        },              
        {
            method:'get',
            path:'/api/user/checkEmail/v1/:email',
            action:'checkEmail'
        }             
    ];
  }
}
