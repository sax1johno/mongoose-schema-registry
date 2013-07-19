mongoose-schema-registry
========================

The Mongoose Schema Registry allows developers to register schemas without creating a mongoose model.  This allows extension of schemas later on prior to registering those models.

The following quick example should help you get started (taken from the ghiraldi framework mvc.js file):
```javascript
    File1.js
    // First, declare the registry object.
    var registry = require('mongoose-schema-registry'),

    // The registry fires events when schemas are added.
    registry.on('add', function(tag, schema) {
        // tag contains the name you gave the schema when you added it.
        // schema is the actual schema added.
    });
    
    // Add a schema to the registry using the add method
    registry.add('schema_name', schema);
```
    
You can modify an existing schema by calling the getSchema method.  Since the
registry is a singleton, requiring will give you the same object with the already
registered schemas.
```javascript
    // File2.js
    var registry = require('mongoose-schema-registry');
    
    var testSchema = registry.getSchema('testSchema');
    // From here, you can add things to your test schema.
    ..
    // When you're done, just re-add the schema.  The new one will clobber 
    // the old one.
    registry.add('testSchema', testSchema);
```
To finally register the schemas into mongoose models, just iterate through the
schemas and call the mongoose.model method.
```javascript
    var keys = registry.getKeys();
    _.each(keys, function(key, index, list) {
        var thisSchema = registry.getSchema(key);
        mongoose.model(key,  thisSchema);
    });
```