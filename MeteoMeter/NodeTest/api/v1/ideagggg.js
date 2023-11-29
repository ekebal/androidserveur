const HttpStatus = require('http-status-codes');
const Ideagggg = global.Models.ideagggg;

module.exports = class IdeaggggController {
 
    
  
 

async list(req, res, next) {
    try {
            let list = [];
          const result = await Ideagggg.find();
      if(result && result.length > 0){
        result.forEach(item=>{
            //Todo, put your mapping implementation here
            //list.push(item)
        });		
        return res.status(HttpStatus.OK).send(list);
      }	   
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Ideagggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }     
    






async delete(req, res, next) {   
    try {
      let deletedEntity = await Ideagggg.destroy({ _id: req.params.idIdea}).fetch();

      if (!deletedEntity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Ideagggg not found with id: ${id}.' });
      }
      else {
        res.status(HttpStatus.OK).send({ message: 'Ideagggg successfully deleted.' })
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
     
    



async update(req, res, next) {   
    try {
        //Todo, change search criteria
      let entity = await Ideagggg.findOne({ _id: req.params.idea });

      if (!entity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Ideagggg not found.' });
      }
      else {
        let updatedEntity = await Ideagggg.update({ _id: id }, req.body).fetch();
        res.status(HttpStatus.OK).send(updatedEntity)
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
     
    
async create(req, res, next) {
     let username = req.body.username;

    try {
        //Todo, change username to your search key 
        let entity = await Ideagggg.findOne({ username: username });

        if (entity) {
            res.status(HttpStatus.CONFLICT);
            res.send({ message: `Ideagggg already exists: ${username}` });
        } else {
            //Todo, add any addition column values to be set by server
            req.body.createdOn = new Date();

            let newEntity = await Ideagggg.create(req.body).fetch();

            res.status(HttpStatus.CREATED);
            res.send(newEntity);
        }
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
}    }