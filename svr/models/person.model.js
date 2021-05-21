const mongoose = require ('mongoose');
const PersonSchema = new mongoose.Schema({
    
//Mandatory fields --------------------------------
    dragName: {type: String, required: true, minlength: 1},
    pronouns: {type: String, required: true, minlength: 1},
    phone: {type: String, required: true, minlength: 10},
    email: {type: String, required: true, minlength: 5},
    contactMethod: {type: Array, required: true, minlength: 1},
    city: {type: String, required: true, minlength: 1},
    
    //Optional fields ---------------------------------
    picture: {type: String},
    otherName: {type: String},
    facebook: {type: String},
    instagram: {type: String},
    twitter: {type: String},
    youtube: {type: String},
    tiktok: {type: String},
    website: {type: String},
    race: {type: String},
    ethnicity: {type: String},
    gender: {type: String},
    disability: {type: String},
    accommodations: {type: Array},
    causes: {type: Array},
    sexuality: {type: String}
}, { timestamps: true });
module.exports.Person = mongoose.model('Person', PersonSchema);