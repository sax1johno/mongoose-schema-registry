var nodeunit = require('nodeunit'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongooseRegistry = require('../lib/mongoose_registry'),
    expect = require('chai').expect;

describe('mongoose_registry', function() {
    before(function(done) {
        // Do nothing beforehand for now.
        done();
    });
    describe("#add", function() {
        it("should add a data model to the registry", function(done) {
            var testSchema = new Schema({
                title:      String,
                test:       String
            });
            mongooseRegistry.add('t', testSchema, function(success) {
                mongooseRegistry.log(function(schemas) {
                    console.log(JSON.stringify(schemas));
                    done();
                    // done(success);
                });
            });
        });
    });
    describe("#remove", function() {
        it("should remove a schema from the registry", function(done) {
            var reg = require('../lib/mongoose_registry');
            var testSchema = new Schema({
            });
            reg.add('t', testSchema, function(success) {
                reg.remove('t', function(success) {
                    reg.log(function(schemas) {
                        console.log(JSON.stringify(schemas));
                        // done(success);
                        done();
                        // test.done();
                    });
                });
            });
        });
    }); 
    describe("#get", function() {
        it("should get a schema from the registry", function(done) {
            var reg = require('../lib/mongoose_registry');
            var testSchema = new Schema({
            });
            reg.add('t', testSchema, function(success) {
                reg.getSchema('t', function(schema) {
                    expect(schema).to.deep.equal(testSchema);
                    // assert.deepEqual(schema, testSchema, 'Schemas should be deep equal to each other.');
                    // test.deepEqual();
                    reg.log(function(schemas) {
                        console.log(JSON.stringify(schemas));
                        // done(schema);
                        done();
                    });
                });
            });
        });
    });
    describe("#keys", function() {
        it("should get all of the keys from the registry", function(done) {
            var reg = require('../lib/mongoose_registry');
            var testSchema = new Schema({});
            var testSchema2 = new Schema({});
            var testSchema3 = new Schema({});
            
            reg.add('t', testSchema, function(success) {
                reg.add('t2', testSchema2, function(success) {
                    reg.add('t3', testSchema3, function(success) {
                        reg.getKeys(function(keys) {
                            var testArray = ['t', 't2', 't3'];
                            expect(testArray).to.deep.equal(keys);
                            // test.deepEqual(testArray, keys);
                            // test.done();
                            done();
                        });
                    });
                });
            });
        });
    });
    describe("#type", function() {
        it("should get all of the keys from the registry", function(done) {
            var reg = require('../lib/mongoose_registry');
            var testSchema = new Schema({});
            
            reg.add('t', testSchema, function(success) {
                reg.getSchema('t', function(schema) {
                    var testSchema = schema;
                    expect(testSchema).to.be.an.instanceof(Schema);
                    // test.ok(testSchema instanceof Schema, 'Retrieved schema should be an instance of mongoose.Schema') 
                    // test.done();
                    done();
                });
            });
        });
    });    
});

        // var reg = require('../lib/mongoose_registry');
        // var testSchema = new Schema({});
        
        // reg.add('t', testSchema, function(success) {
        //     reg.getSchema('t', function(schema) {
        //         var testSchema = schema;
        //         test.ok(testSchema instanceof Schema, 'Retrieved schema should be an instance of mongoose.Schema') 
        //         test.done();
        //     });
        // })
