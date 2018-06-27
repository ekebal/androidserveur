const HttpStatus = require('http-status-codes');
const ControllerBase = require('./ControllerBase');
const MailSender = require('../services/mailService');

const User  = global.Models.user;

module.exports = class UserController extends ControllerBase{
  constructor(){
        super();
    }

     // GET: Users
    async index(req, res){
        try{
            let entities = await User.find();

            if(!entities){
                entities = [];
            }

            res.render('./user/index', {entities:entities});
        } catch (err) {
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET:User/Details/4
    async details(req, res){
        let id = req.params.id;
        try{
            let entity = await User.findOne({_id:id});

            if(!entity){
                entity = {};
            }

            res.render('./user/details', entity);
        }catch(err){
            res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // GET: User/Create
    create(req, res){
        res.render('./user/create');
    }

    // POST: User/Create
    async save(req, res){
        try{
            //Todo, change username to your search key 
            let entity = await User.findOne({ username: req.body.username });

            if (entity) {
                res.render('./errors/error', { message: `User already exists: ${username}` });
            } else {
                //Todo, add any addition column values to be set by server
            req.body.creationDate = (new Date()).toISOString();

            await User.create(req.body);

            MailSender.sendNewUserEmail(req.body.firstName + ' ' + req.body.lastName, req.body.username,
                (err) => {
                    if (err) {
                        res.render('./errors/error', { message: `Mail send error: ${err.message}` });
                    } else {
                        res.redirect('/user/index');
                    }
                });
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: <entity>/Edit/4
    async edit(req, res){
        let id = req.params.id;
         try{
            let entity = await User.findOne({ _id : id });
        
            if(!entity){
                res.render('./errors/error', { message: `User not found with id: ${id}`});
            }else{
                res.render('./user/edit', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

    // PUT: User/Edit/4
    async update(req, res){
        let id = req.params.id;
        
        try{
            //Todo, change search criteria based on requirement
        let entity = await User.findOne({ _id: id});

        if (!entity) {
            res.render('./errors/error', { message: `User not found with id: ${id}`});
        } else {
            let updatedEntity = await User.update({ _id: id }, req.body).fetch();
            res.redirect('/user/index');
        }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
    }

     // GET: User/Delete/4
     async delete(req, res){
        let id = req.params.id;

        try{
            let entity = await User.findOne({ _id: id});

            if (!entity) {
                res.render('./errors/error', { message: `User not found with id: ${id}`});
            } else {
                res.render('./user/delete', entity);
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }

     async deleteConfirmed(req, res){
        let id = req.params.id;
        try{
            let deletedEntity = await User.destroy({ _id: id}).fetch();

            if (!deletedEntity) {
                res.render('./errors/error', { message: `User not found with id: ${id}`});
            } else {
                res.redirect('/user/index');
            }
        }catch(err){
            res.render('./errors/error', { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
        }
     }
}
