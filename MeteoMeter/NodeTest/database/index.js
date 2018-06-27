const Waterline = require('waterline');
const dbConfig = require('../config/connections');
const fs = require('fs');
const path = require('path');

module.exports = class Database {
    initialize(callback) {
        let modelSchemas = this.getModelSchemas(path.join(__dirname, '../models'));

        if (modelSchemas) {
            this.registerModels(modelSchemas, function (err) {
                callback(err);
            });
        } else {
            callback(new Error("Error while loading model schema files"));
        }
    }

    getModelSchemas(modelsFolder) {
        let modelSchemas = {};
        try {
            fs.readdirSync(modelsFolder)
                .forEach(function (file) {
                    var modelPath = path.join(modelsFolder, file);
                    if (fs.existsSync(modelPath)) {
                        let SchemaClass = require(modelPath);
                        let schema = new SchemaClass();
                        schema.identity = file.split('.')[0].toLowerCase();
                        schema.datastore = 'mongodb';
                        modelSchemas[schema.identity] = schema;
                    }
                });
        } catch (err) {
            console.log(err);
            return null;
        }
        return modelSchemas;
    }

    registerModels(modelSchemas, callback) {
        Waterline.start({
            adapters: dbConfig.adapters,
            datastores: dbConfig.datastores,
            models: modelSchemas
        },
            function (err, orm) {
                if (err) {
                    console.log(err);
                    process.exit(0);
                }

                global.Models = {};
                for (var key in modelSchemas) {
                    global.Models[key] = Waterline.getModel(key, orm);;
                }
                callback(null);
            });
    }
}