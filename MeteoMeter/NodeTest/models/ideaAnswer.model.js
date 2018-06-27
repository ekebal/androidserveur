const Answer = require('./answer.model');

module.exports = class IdeaAnswer extends Answer{
    constructor(){
        super();

        this.attributes.ideaCard = {
            model:'idea'
        };
    this.attributes.ideaChoice = {
            model:'choice'
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
