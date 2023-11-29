const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const Choice = global.Models.choice;

module.exports = class ChoiceController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: Choice
    async index(req, res){
        try{
            let entities = await Choice.find()
            ;

            if(!entities){
                entities = [];
            }

            res.render('./choice/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:Choice/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await Choice.findOne({_id:id})
            ;

            if(!entity){
                entity = {};
            }

            res.render('./choice/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./choice/create');
    }

    // POST: Choice/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await Choice.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `Choice already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await Choice.create(req.body);

            res.redirect('/choice/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await Choice.findOne({ _id : id })
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `Choice not found with id: ${id}`});
            }else{
                res.render('./choice/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: Choice/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await Choice.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `Choice not found with id: ${id}`});
        } else {
            let updatedEntity = await Choice.update({ _id: id }, req.body).fetch();
            res.redirect('/choice/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: Choice/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await Choice.findOne({ _id: id})
            ;

            if (!entity) {
                res.render('./errors/error', { message: `Choice not found with id: ${id}`});
            } else {
                res.render('./choice/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await Choice.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `Choice not found with id: ${id}`});
            } else {
                res.redirect('/choice/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
