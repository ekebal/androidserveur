const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const Card = global.Models.card;

module.exports = class CardController extends ControllerBase{
    constructor(){
        super();
    }
    
    // GET: Card
    async index(req, res){
        try{
            let entities = await Card.find()
            .populate('createdBy')
            .populate('photo')
            .populate('targetGroups')
            .populate('choices')
            ;

            if(!entities){
                entities = [];
            }

            res.render('./card/index', {entities:entities});
        } catch (err) {            
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET:Card/Details/5
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await Card.findOne({_id:id})
            .populate('createdBy')
            .populate('photo')
            .populate('targetGroups')
            .populate('choices')
            ;

            if(!entity){
                entity = {};
            }

            res.render('./card/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: <entity>/Create
    create(req, res){
        res.render('./card/create');
    }

    // POST: Card/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
           // let entity = await Card.findOne({ username: username });
        //if (entity) {
        //    res.render('./errors/error', { message: `Card already exists: ${username}` });
        //} else {
            //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await Card.create(req.body);

            res.redirect('/card/index');
        //}
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await Card.findOne({ _id : id })
            .populate('createdBy')
            .populate('photo')
            .populate('targetGroups')
            .populate('choices')
            ;
        
            if(!entity){
                res.render('./errors/error', { message: `Card not found with id: ${id}`});
            }else{
                res.render('./card/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: Card/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await Card.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `Card not found with id: ${id}`});
        } else {
            let updatedEntity = await Card.update({ _id: id }, req.body).fetch();
            res.redirect('/card/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: Card/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await Card.findOne({ _id: id})
            .populate('createdBy')
            .populate('photo')
            .populate('targetGroups')
            .populate('choices')
            ;

            if (!entity) {
                res.render('./errors/error', { message: `Card not found with id: ${id}`});
            } else {
                res.render('./card/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await Card.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `Card not found with id: ${id}`});
            } else {
                res.redirect('/card/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
