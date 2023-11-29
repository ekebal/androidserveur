const HttpStatus = require('http-status-codes');
const Flowgggg = global.Models.flowgggg;

module.exports = class FlowggggController {
 
    
  
 

async list(req, res, next) {
    try {
            let list = [];
          const result = await Flowgggg.find();
      if(result && result.length > 0){
        result.forEach(item=>{
            //Todo, put your mapping implementation here
            //list.push(item)
        });		
        return res.status(HttpStatus.OK).send(list);
      }	   
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Flowgggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }    }