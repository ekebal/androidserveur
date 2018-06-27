const HttpStatus = require('http-status-codes');
const Groupgggg = global.Models.groupgggg;

module.exports = class GroupggggController {
 
    
async create(req, res, next) {
     let username = req.body.username;

    try {
        //Todo, change username to your search key 
        let entity = await Groupgggg.findOne({ username: username });

        if (entity) {
            res.status(HttpStatus.CONFLICT);
            res.send({ message: `Groupgggg already exists: ${username}` });
        } else {
            //Todo, add any addition column values to be set by server
            req.body.createdOn = new Date();

            let newEntity = await Groupgggg.create(req.body).fetch();

            res.status(HttpStatus.CREATED);
            res.send(newEntity);
        }
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
}     
    



async update(req, res, next) {   
    try {
        //Todo, change search criteria
      let entity = await Groupgggg.findOne({ _id: req.params.group });

      if (!entity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Groupgggg not found.' });
      }
      else {
        let updatedEntity = await Groupgggg.update({ _id: id }, req.body).fetch();
        res.status(HttpStatus.OK).send(updatedEntity)
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
     
    






async delete(req, res, next) {   
    try {
      let deletedEntity = await Groupgggg.destroy({ _id: req.params.idGroup}).fetch();

      if (!deletedEntity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Groupgggg not found with id: ${id}.' });
      }
      else {
        res.status(HttpStatus.OK).send({ message: 'Groupgggg successfully deleted.' })
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
     
    
  
 

async listMyGroups(req, res, next) {
    try {
            let list = [];
          const result = await Groupgggg.find();
      if(result && result.length > 0){
        result.forEach(item=>{
            //Todo, put your mapping implementation here
            //list.push(item)
        });		
        return res.status(HttpStatus.OK).send(list);
      }	   
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Groupgggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }     
    
  
 

async list(req, res, next) {
    try {
            let list = [];
          const result = await Groupgggg.find();
      if(result && result.length > 0){
        result.forEach(item=>{
            //Todo, put your mapping implementation here
            //list.push(item)
        });		
        return res.status(HttpStatus.OK).send(list);
      }	   
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Groupgggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }     
    



async addMember(req, res, next) {   
    try {
        //Todo, change search criteria
      let entity = await Groupgggg.findOne({ _id: req.params.user });

      if (!entity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Groupgggg not found.' });
      }
      else {
        let updatedEntity = await Groupgggg.update({ _id: id }, req.body).fetch();
        res.status(HttpStatus.OK).send(updatedEntity)
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
     
    



async removeMember(req, res, next) {   
    try {
        //Todo, change search criteria
      let entity = await Groupgggg.findOne({ _id: req.params.id });

      if (!entity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Groupgggg not found.' });
      }
      else {
        let updatedEntity = await Groupgggg.update({ _id: id }, req.body).fetch();
        res.status(HttpStatus.OK).send(updatedEntity)
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
    }