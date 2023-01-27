// requiring the mongoose package
const mongoose = require("mongoose")

// define 'mongoose schema' where key/value pairs are what we want our models to be
// type definitions, validations mongoose options all go in the schema
// mongoose.Schema({ key/val pairs for the model}, options object(mongoose config)})

const itemSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    category: {type: String},
    url: {type: String},
    userId: {type: String}
}, {
    timestamps: true // mongoose will manage create at and updated fields for us
})

// turn the schema into a model so we can use it in our js
// exports
module.exports = mongoose.model('item', itemSchema)