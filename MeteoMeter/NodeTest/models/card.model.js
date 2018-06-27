const Identifier = require('./identifier.model');

module.exports = class Card extends Identifier{
    constructor(){
        super();
    
        this.attributes.publicationDate = {
            type: 'string'
        };
    
        this.attributes.content = {
            type: 'string'
        };
    
        this.attributes.type = {
            type: 'string'
        };

        this.attributes.createdBy = {
            model:'userProfile'
        };
    this.attributes.photo = {
            model:'photo'
        };
    this.attributes.targetGroups = {
            collection:'group'
        };
    this.attributes.choices = {
            collection:'choice'
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
