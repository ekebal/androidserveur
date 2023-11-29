const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const IdeaAnswer = global.Models.ideaanswer;

module.exports = class IdeaAnswerController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: IdeaAnswer
    async index(req, res){
        try{
            let entities = await IdeaAnswer.find()
            .populate('ideaCard')
            .populate('ideaChoice')
            ;

            if(!entities){
                entities = [];
            }

            res.render('./ideaAnswer/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:IdeaAnswer/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await IdeaAnswer.findOne({_id:id})
            .populate('ideaCard')
            .populate('ideaChoice')
            ;

            if(!entity){
                entity = {};
            }

            res.render('./ideaAnswer/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./ideaAnswer/create');
    }

    // POST: IdeaAnswer/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await IdeaAnswer.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `IdeaAnswer already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await IdeaAnswer.create(req.body);

            res.redirect('/ideaAnswer/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await IdeaAnswer.findOne({ _id : id })
            .populate('ideaCard')
            .populate('ideaChoice')
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `IdeaAnswer not found with id: ${id}`});
            }else{
                res.render('./ideaAnswer/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: IdeaAnswer/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await IdeaAnswer.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `IdeaAnswer not found with id: ${id}`});
        } else {
            let updatedEntity = await IdeaAnswer.update({ _id: id }, req.body).fetch();
            res.redirect('/ideaAnswer/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: IdeaAnswer/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await IdeaAnswer.findOne({ _id: id})
            .populate('ideaCard')
            .populate('ideaChoice')
            ;

            if (!entity) {
                res.render('./errors/error', { message: `IdeaAnswer not found with id: ${id}`});
            } else {
                res.render('./ideaAnswer/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await IdeaAnswer.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `IdeaAnswer not found with id: ${id}`});
            } else {
                res.redirect('/ideaAnswer/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
