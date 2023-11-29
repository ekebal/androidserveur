const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const Answer = global.Models.answer;

module.exports = class AnswerController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: Answer
    async index(req, res){
        try{
            let entities = await Answer.find()
            .populate('answeredBy')
            ;

            if(!entities){
                entities = [];
            }

            res.render('./answer/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:Answer/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await Answer.findOne({_id:id})
            .populate('answeredBy')
            ;

            if(!entity){
                entity = {};
            }

            res.render('./answer/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./answer/create');
    }

    // POST: Answer/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await Answer.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `Answer already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await Answer.create(req.body);

            res.redirect('/answer/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await Answer.findOne({ _id : id })
            .populate('answeredBy')
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `Answer not found with id: ${id}`});
            }else{
                res.render('./answer/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: Answer/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await Answer.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `Answer not found with id: ${id}`});
        } else {
            let updatedEntity = await Answer.update({ _id: id }, req.body).fetch();
            res.redirect('/answer/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: Answer/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await Answer.findOne({ _id: id})
            .populate('answeredBy')
            ;

            if (!entity) {
                res.render('./errors/error', { message: `Answer not found with id: ${id}`});
            } else {
                res.render('./answer/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await Answer.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `Answer not found with id: ${id}`});
            } else {
                res.redirect('/answer/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
