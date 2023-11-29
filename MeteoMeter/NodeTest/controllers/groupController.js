const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const Group = global.Models.group;

module.exports = class GroupController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: Group
    async index(req, res){
        try{
            let entities = await Group.find()
            .populate('createdBy')
            .populate('users')
            ;

            if(!entities){
                entities = [];
            }

            res.render('./group/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:Group/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await Group.findOne({_id:id})
            .populate('createdBy')
            .populate('users')
            ;

            if(!entity){
                entity = {};
            }

            res.render('./group/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./group/create');
    }

    // POST: Group/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await Group.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `Group already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await Group.create(req.body);

            res.redirect('/group/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await Group.findOne({ _id : id })
            .populate('createdBy')
            .populate('users')
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `Group not found with id: ${id}`});
            }else{
                res.render('./group/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: Group/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await Group.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `Group not found with id: ${id}`});
        } else {
            let updatedEntity = await Group.update({ _id: id }, req.body).fetch();
            res.redirect('/group/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: Group/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await Group.findOne({ _id: id})
            .populate('createdBy')
            .populate('users')
            ;

            if (!entity) {
                res.render('./errors/error', { message: `Group not found with id: ${id}`});
            } else {
                res.render('./group/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await Group.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `Group not found with id: ${id}`});
            } else {
                res.redirect('/group/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
