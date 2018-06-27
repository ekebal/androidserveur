const Card = require('./card.model');

module.exports = class Reporting extends Card{
    constructor(){
        super();
    
        this.attributes.results = {
            type: 'number'
        };
    
        this.attributes.views = {
            type: 'integer'
        };
    
        this.attributes.idCard = {
            type: 'integer'
        };


        //Model Lifecycle callbacks

        //Lifecycle callbacks on .create()
        this.beforeCreate = function(recordToCreate, next){
            next();
        };

        this.afterCreate = function(newlyCreatedRecord, next){
            next();
        };

        //Lifecycle callbacks on .update()
        this.beforeUpdate = function(valuesToSet, next){
            next();
        };

        this.afterUpdate = function(updatedRecord, next){
            next();
        };

        //Lifecycle callbacks on .destroy()
        this.beforeDestroy = function(criteria, next){
            next();
        };

        this.afterDestroy = function(destroyedRecord, next){
            next();
        };
    }
}
