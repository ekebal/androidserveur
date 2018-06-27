const Identifier = require('./identifier.model');

module.exports = class Choice extends Identifier{
    constructor(){
        super();
    
        this.attributes.name = {
            type: 'string'
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
