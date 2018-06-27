const HttpStatus = require('http-status-codes');
const Highlightsgggg = global.Models.highlightsgggg;

module.exports = class HighlightsggggController {
 
    
  
 

async getTopPosts(req, res, next) {
    try {
            let list = [];
          const result = await Highlightsgggg.find();
      if(result && result.length > 0){
        result.forEach(item=>{
            //Todo, put your mapping implementation here
            //list.push(item)
        });		
        return res.status(HttpStatus.OK).send(list);
      }	   
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Highlightsgggg not found.' });
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }     
    







async getBestContributor(req, res, next) {
    try {
              return res.status(HttpStatus.OK).send(result);
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  }  
    







async getBestIdea(req, res, next) {
    try {
              return res.status(HttpStatus.OK).send(result);
          } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
    }
  } }