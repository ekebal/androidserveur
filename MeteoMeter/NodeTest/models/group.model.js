const Identifier = require('./identifier.model');

module.exports = class Group extends Identifier{
    constructor(){
        super();
    
        this.attributes.name = {
            type: 'string'
        };
    
        this.attributes.groupDepartment = {
            type: 'string'
        };
    
        this.attributes.city = {
            type: 'string'
        };
    
        this.attributes.creationDate = {
            type: 'string'
        };
    
        this.attributes.country = {
            type: 'string'
        };

        this.attributes.createdBy = {
            model:'userProfile'
        };
    this.attributes.users = {
            collection:'userProfile'
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
