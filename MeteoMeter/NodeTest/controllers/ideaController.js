const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const Idea = global.Models.idea;

module.exports = class IdeaController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: Idea
    async index(req, res){
        try{
            let entities = await Idea.find()
            ;

            if(!entities){
                entities = [];
            }

            res.render('./idea/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:Idea/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await Idea.findOne({_id:id})
            ;

            if(!entity){
                entity = {};
            }

            res.render('./idea/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./idea/create');
    }

    // POST: Idea/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await Idea.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `Idea already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await Idea.create(req.body);

            res.redirect('/idea/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await Idea.findOne({ _id : id })
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `Idea not found with id: ${id}`});
            }else{
                res.render('./idea/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: Idea/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await Idea.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `Idea not found with id: ${id}`});
        } else {
            let updatedEntity = await Idea.update({ _id: id }, req.body).fetch();
            res.redirect('/idea/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: Idea/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await Idea.findOne({ _id: id})
            ;

            if (!entity) {
                res.render('./errors/error', { message: `Idea not found with id: ${id}`});
            } else {
                res.render('./idea/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await Idea.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `Idea not found with id: ${id}`});
            } else {
                res.redirect('/idea/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
