const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const UserProfile = global.Models.userprofile;

module.exports = class UserProfileController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: UserProfile
    async index(req, res){
        try{
            let entities = await UserProfile.find()
            ;

            if(!entities){
                entities = [];
            }

            res.render('./userProfile/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:UserProfile/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await UserProfile.findOne({_id:id})
            ;

            if(!entity){
                entity = {};
            }

            res.render('./userProfile/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./userProfile/create');
    }

    // POST: UserProfile/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await UserProfile.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `UserProfile already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await UserProfile.create(req.body);

            res.redirect('/userProfile/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await UserProfile.findOne({ _id : id })
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `UserProfile not found with id: ${id}`});
            }else{
                res.render('./userProfile/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: UserProfile/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await UserProfile.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `UserProfile not found with id: ${id}`});
        } else {
            let updatedEntity = await UserProfile.update({ _id: id }, req.body).fetch();
            res.redirect('/userProfile/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: UserProfile/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await UserProfile.findOne({ _id: id})
            ;

            if (!entity) {
                res.render('./errors/error', { message: `UserProfile not found with id: ${id}`});
            } else {
                res.render('./userProfile/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await UserProfile.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `UserProfile not found with id: ${id}`});
            } else {
                res.redirect('/userProfile/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
