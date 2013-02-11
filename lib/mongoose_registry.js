var mongoose = require('mongoose'),
    _ = require('underscore'),
    EventEmitter = require('events').EventEmitter;

function MongooseRegistry() {
    var schemas = {};

    /* This class is a singleton */
    if (arguments.callee._singletonInstance) {
        return arguments.callee._singletonInstance;
    }
    arguments.callee._singletonInstance = this;
    
    EventEmitter.call(this);
    
    /** 
     * Add a new schema to the schema registry.  If a tag is re-used, the previous schema
     * is overwritten.
     * @param schema the schema to add.
     * @param tag the tag for this schema (used to retrieve the schema)
     * @return the added schema.
     **/
    this.add = function(tag, schema, fn) {
        if (!_.isUndefined(fn) && !_.isNull(fn) && _.isFunction(fn)) {
            fn(schemas[tag] = schema);
        } else {
            schemas[tag] = schema;
        }
        this.emit('add', tag, schema);        
    };
    
    /**
     * Remove a schema from the schema registry.
     * @param tag the tag for the schema to be removed
     * @return true if the delete was successful, false otherwise.
     **/
    this.remove = function(tag, fn) {
        var deleted = schemas[tag];
        if (!_.isUndefined(fn) && !_.isNull(fn) && _.isFunction(fn)) {
            fn(delete schemas[tag]);            
        } else {
            return delete schemas[tag];
        }
        this.emit('remove', deleted);
    };
    
    this.get = function(tag, fn) {
        if (!_.isUndefined(fn) && !_.isNull(fn)) {
            fn(schemas[tag]);
        }
        return schemas[tag];
    };
    
    /** For testing purposes.  Will probably go away soon **/
    this.log = function(fn) {
        if (!_.isUndefined(fn) && !_.isNull(fn)) {
            fn(schemas);
        }
        return schemas;
    };
    
    this.getKeys = function(fn) {
        var keys = _.keys(schemas);
        if (!_.isArray(keys)) {
            keys = [keys];
        }
        if (!_.isUndefined(fn) && !_.isNull(fn)) {
            fn(keys);      
        }
        return keys;
    }
}

MongooseRegistry.prototype.__proto__ = EventEmitter.prototype;

module.exports = new MongooseRegistry();