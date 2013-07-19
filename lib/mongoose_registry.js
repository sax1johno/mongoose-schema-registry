var mongoose = require('mongoose'),
    _ = require('underscore'),
    EventEmitter = require('events').EventEmitter,
    Schema = mongoose.Schema;
    
function MongooseRegistry() {
//    /* This class is a singleton */
//    if (arguments.callee._singletonInstance) {
//        return arguments.callee._singletonInstance;
//    }
//    arguments.callee._singletonInstance = this;
//    
    EventEmitter.call(this);
    
    this.schemas = {};
    
    return this;
};

    /** 
     * Add a new schema to the schema registry.  If a tag is re-used, the previous schema
     * is overwritten.
     * @param schema the schema to add.
     * @param tag the tag for this schema (used to retrieve the schema)
     * @return the added schema.
     **/
MongooseRegistry.prototype.add = function(tag, schema, fn) {
        if (!_.isUndefined(fn) && !_.isNull(fn) && _.isFunction(fn)) {
            fn(this.schemas[tag] = schema);
        } else {
            this.schemas[tag] = schema;
        }
        this.emit('add', tag, schema);        
    };
    
    /**
     * Remove a schema from the schema registry.
     * @param tag the tag for the schema to be removed
     * @return true if the delete was successful, false otherwise.
     **/
MongooseRegistry.prototype.remove = function(tag, fn) {
        var deleted = this.schemas[tag];
        if (!_.isUndefined(fn) && !_.isNull(fn) && _.isFunction(fn)) {
            fn(delete this.schemas[tag]);
        } else {
            return delete this.schemas[tag];
        }
        this.emit('remove', deleted);
    };
    
MongooseRegistry.prototype.getSchema = function(tag, fn) {
        if (_.isUndefined(this.schemas[tag]) || _.isNull(this.schemas[tag])) {
            this.schemas[tag] = new Schema({});
        }
        if (!_.isUndefined(fn) && !_.isNull(fn)) {
            fn(this.schemas[tag]);
        }

        return this.schemas[tag];
    };
    
    /** For testing purposes.  Will probably go away soon **/
MongooseRegistry.prototype.log = function(fn) {
        if (!_.isUndefined(fn) && !_.isNull(fn)) {
            fn(this.schemas);
        }
        return this.schemas;
    };
    
MongooseRegistry.prototype.getKeys = function(fn) {
        var keys = _.keys(this.schemas);
        if (!_.isArray(keys)) {
            keys = [keys];
        }
        if (!_.isUndefined(fn) && !_.isNull(fn)) {
            fn(keys);      
        }
        return keys;
    };    

MongooseRegistry.prototype.__proto__ = EventEmitter.prototype;

module.exports = new MongooseRegistry;