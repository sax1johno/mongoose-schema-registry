var mongoose = require('mongoose');
var _ = require('underscore');

function MongooseRegistry() {
    var schemas = {};

    /* This class is a singleton */
    if (arguments.callee._singletonInstance) {
        return arguments.callee._singletonInstance;
    }
    arguments.callee._singletonInstance = this;
    
    /** 
     * Add a new schema to the schema registry.  If a tag is re-used, the previous schema
     * is overwritten.
     * @param schema the schema to add.
     * @param tag the tag for this schema (used to retrieve the schema)
     * @return the added schema.
     **/
    this.add = function(schema, tag, fn) {
        fn(schemas[tag] = schema);
    };
    
    this.remove = function(tag, fn) {
        fn(delete schemas[tag]);
    };
    
    this.get = function(tag, fn) {
        fn(schemas[tag]);
    };
    
    /** For testing purposes.  Will probably go away soon **/
    this.log = function(fn) {
        fn(schemas);
    };
}

var mongooseRegistry = new MongooseRegistry();

module.exports = mongooseRegistry;