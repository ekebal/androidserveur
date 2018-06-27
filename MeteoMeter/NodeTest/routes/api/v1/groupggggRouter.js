const Router = require('../../router');
const GroupggggController = require('../../../controllers/groupggggController');

module.exports = class GroupggggRouter extends Router{
    public constructor(routePath, app, controller = null) {
        super(routePath, app, new GroupggggController());
  }

  get routes(){
    return[
         
        {
            method:'post',
            path:'/api/group/create/v1/:group',
            action:'create'
        },              
        {
            method:'put',
            path:'/api/group/update/v1/:group',
            action:'update'
        },              
        {
            method:'delete',
            path:'/api/group/delete/v1/:idGroup',
            action:'delete'
        },              
        {
            method:'get',
            path:'/api/group/listMyGroups/v1/:idUser',
            action:'listMyGroups'
        },              
        {
            method:'get',
            path:'/api/group/list/v1/:idUser',
            action:'list'
        },              
        {
            method:'put',
            path:'/api/group/addMember/v1/:user',
            action:'addMember'
        },              
        {
            method:'put',
            path:'/api/group/removeMember/v1/:id',
            action:'removeMember'
        }             
    ];
  }
}
