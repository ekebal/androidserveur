const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const Photo = global.Models.photo;

module.exports = class PhotoController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: Photo
    async index(req, res){
        try{
            let entities = await Photo.find()
            ;

            if(!entities){
                entities = [];
            }

            res.render('./photo/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:Photo/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await Photo.findOne({_id:id})
            ;

            if(!entity){
                entity = {};
            }

            res.render('./photo/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./photo/create');
    }

    // POST: Photo/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await Photo.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `Photo already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await Photo.create(req.body);

            res.redirect('/photo/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await Photo.findOne({ _id : id })
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `Photo not found with id: ${id}`});
            }else{
                res.render('./photo/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: Photo/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await Photo.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `Photo not found with id: ${id}`});
        } else {
            let updatedEntity = await Photo.update({ _id: id }, req.body).fetch();
            res.redirect('/photo/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: Photo/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await Photo.findOne({ _id: id})
            ;

            if (!entity) {
                res.render('./errors/error', { message: `Photo not found with id: ${id}`});
            } else {
                res.render('./photo/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await Photo.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `Photo not found with id: ${id}`});
            } else {
                res.redirect('/photo/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
