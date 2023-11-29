const HttpStatus = require('http-status-codes');
const Postgggg = global.Models.postgggg;

module.exports = class PostggggController {
 
    
async uploadPicture(req, res, next) {
     let username = req.body.username;

    try {
        //Todo, change username to your search key 
        let entity = await Postgggg.findOne({ username: username });

        if (entity) {
            res.status(HttpStatus.CONFLICT);
            res.send({ message: `Postgggg already exists: ${username}` });
        } else {
            //Todo, add any addition column values to be set by server
            req.body.createdOn = new Date();

            let newEntity = await Postgggg.create(req.body).fetch();

            res.status(HttpStatus.CREATED);
            res.send(newEntity);
        }
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
}     
    







async getDefaultPicture(req, res, next) {
    try {
              return res.status(HttpStatus.OK).send(result);
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }  
    







async get(req, res, next) {
    try {
              const entity = await Postgggg.findOne({_id:id});

      if(entity){		
        return res.status(HttpStatus.OK).send(result);
      }
      
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Postgggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }  
    
  
 

async getLatestsPostsByUser(req, res, next) {
    try {
            let list = [];
          const result = await Postgggg.find();
      if(result && result.length > 0){
        result.forEach(item=>{
            //Todo, put your mapping implementation here
            //list.push(item)
        });		
        return res.status(HttpStatus.OK).send(list);
      }	   
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Postgggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }     
    



async update(req, res, next) {   
    try {
        //Todo, change search criteria
      let entity = await Postgggg.findOne({ _id: req.params.post });

      if (!entity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Postgggg not found.' });
      }
      else {
        let updatedEntity = await Postgggg.update({ _id: id }, req.body).fetch();
        res.status(HttpStatus.OK).send(updatedEntity)
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
     
    
  
 

async getTopPostsByUser(req, res, next) {
    try {
            let list = [];
          const result = await Postgggg.find();
      if(result && result.length > 0){
        result.forEach(item=>{
            //Todo, put your mapping implementation here
            //list.push(item)
        });		
        return res.status(HttpStatus.OK).send(list);
      }	   
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Postgggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }     
    






async delete(req, res, next) {   
    try {
      let deletedEntity = await Postgggg.destroy({ _id: req.params.id}).fetch();

      if (!deletedEntity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Postgggg not found with id: ${id}.' });
      }
      else {
        res.status(HttpStatus.OK).send({ message: 'Postgggg successfully deleted.' })
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
    }