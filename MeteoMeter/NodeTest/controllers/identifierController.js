const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const Identifier = global.Models.identifier;

module.exports = class IdentifierController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: Identifier
    async index(req, res){
        try{
            let entities = await Identifier.find()
            ;

            if(!entities){
                entities = [];
            }

            res.render('./identifier/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:Identifier/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await Identifier.findOne({_id:id})
            ;

            if(!entity){
                entity = {};
            }

            res.render('./identifier/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./identifier/create');
    }

    // POST: Identifier/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await Identifier.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `Identifier already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await Identifier.create(req.body);

            res.redirect('/identifier/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await Identifier.findOne({ _id : id })
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `Identifier not found with id: ${id}`});
            }else{
                res.render('./identifier/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: Identifier/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await Identifier.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `Identifier not found with id: ${id}`});
        } else {
            let updatedEntity = await Identifier.update({ _id: id }, req.body).fetch();
            res.redirect('/identifier/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: Identifier/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await Identifier.findOne({ _id: id})
            ;

            if (!entity) {
                res.render('./errors/error', { message: `Identifier not found with id: ${id}`});
            } else {
                res.render('./identifier/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await Identifier.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `Identifier not found with id: ${id}`});
            } else {
                res.redirect('/identifier/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
