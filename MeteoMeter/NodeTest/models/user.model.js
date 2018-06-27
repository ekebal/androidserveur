module.exports = class User {
    constructor(){
        this.primaryKey = '_id';

        this.attributes = {
            _id: {
                type: 'string'
            },
            username: {
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required: true
            },
            firstName: {
                type: 'string'
            },
            lastName: {
                type: 'string'
            },
            creationDate:{
                type: 'string'
            }
        };

        //Model Lifecycle callbacks

        //Lifecycle callbacks on .create()
        this.beforeCreate = function(recordToCreate, next){
            var bcrypt = require('bcrypt');

            bcrypt.genSalt(10, function (err, salt) {
                if (err) return next(err);

                bcrypt.hash(recordToCreate.password, salt, function (err, hash) {
                    if (err) return next(err);

                    recordToCreate.password = hash;
                    next();
                });
            });
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
