const HttpStatus = require('http-status-codes');
const Usergggg = global.Models.usergggg;

module.exports = class UserggggController {
 
    







async signIn(req, res, next) {
    try {
           return res.status(HttpStatus.NOT_FOUND).send({ message: 'Usergggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }  
    







async get(req, res, next) {
    try {
              const entity = await Usergggg.findOne({_id:idUser});

      if(entity){		
        return res.status(HttpStatus.OK).send(result);
      }
      
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Usergggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }  
    



async update(req, res, next) {   
    try {
        //Todo, change search criteria
      let entity = await Usergggg.findOne({ _id: req.params.user });

      if (!entity) {
        res.status(HttpStatus.NOT_FOUND);
        res.send({ message: 'Usergggg not found.' });
      }
      else {
        let updatedEntity = await Usergggg.update({ _id: id }, req.body).fetch();
        res.status(HttpStatus.OK).send(updatedEntity)
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }
     
    
  
 

async list(req, res, next) {
    try {
            let list = [];
          const result = await Usergggg.find();
      if(result && result.length > 0){
        result.forEach(item=>{
            //Todo, put your mapping implementation here
            //list.push(item)
        });		
        return res.status(HttpStatus.OK).send(list);
      }	   
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Usergggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }     
    







async checkEmail(req, res, next) {
    try {
           return res.status(HttpStatus.NOT_FOUND).send({ message: 'Usergggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  } }