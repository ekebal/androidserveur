const Identifier = require('./identifier.model');

module.exports = class UserProfile extends Identifier{
    constructor(){
        super();
    
        this.attributes.userId = {
            type: 'string'
        };
    
        this.attributes.job = {
            type: 'string'
        };
    
        this.attributes.department = {
            type: 'string'
        };
    
        this.attributes.city = {
            type: 'string'
        };
    
        this.attributes.country = {
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
