const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const Reporting = global.Models.reporting;

module.exports = class ReportingController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: Reporting
    async index(req, res){
        try{
            let entities = await Reporting.find()
            ;

            if(!entities){
                entities = [];
            }

            res.render('./reporting/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:Reporting/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await Reporting.findOne({_id:id})
            ;

            if(!entity){
                entity = {};
            }

            res.render('./reporting/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./reporting/create');
    }

    // POST: Reporting/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await Reporting.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `Reporting already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await Reporting.create(req.body);

            res.redirect('/reporting/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await Reporting.findOne({ _id : id })
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `Reporting not found with id: ${id}`});
            }else{
                res.render('./reporting/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: Reporting/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await Reporting.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `Reporting not found with id: ${id}`});
        } else {
            let updatedEntity = await Reporting.update({ _id: id }, req.body).fetch();
            res.redirect('/reporting/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: Reporting/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await Reporting.findOne({ _id: id})
            ;

            if (!entity) {
                res.render('./errors/error', { message: `Reporting not found with id: ${id}`});
            } else {
                res.render('./reporting/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await Reporting.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `Reporting not found with id: ${id}`});
            } else {
                res.redirect('/reporting/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
