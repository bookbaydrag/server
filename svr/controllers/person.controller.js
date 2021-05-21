const { Person } = require('../models/person.model');
module.exports.index = (req, res) => {
    res.json({
        title: "Book Bay Drag"
    });
}

module.exports.createPerson = (req, res) => {
    const { 
        dragName,
        otherName,
        email,
        phone,
        contactMethod,
        city,
        facebook,
        insta,
        twitter,
        youtube,
        tiktok,
        website,
        race,
        ethnicity,
        gender,
        pronouns,
        disability,
        ADA,
        causes,
        picture,
        sexuality 
    } = req.body;

    Person.create({
        dragName,
        otherName,
        email,
        phone,
        contactMethod,
        city,
        facebook,
        insta,
        twitter,
        youtube,
        tiktok,
        website,
        race,
        ethnicity,
        gender,
        pronouns,
        disability,
        ADA,
        causes,
        picture,
        sexuality
    })
        .then(person => res.json(person))
        .catch(err => res.json(err));
}

module.exports.getAllPeople = (req, res) => {
    Person.find({})
    .then(persons => res.json(persons))
    .catch(err => res.json(err))
}

module.exports.getOnePerson = (req, res) => {
    Person.findOne({_id: req.params.id})
        .then(person => res.json(person))
        .catch(err => res.json(err))
}

module.exports.updatePerson = (req, res) => {
    Person.findOne({_id: req.params.id}, req.body, {new: true})
        .then(updatePerson => res.json(updatedPerson))
        .catch(err => res.json(err))
}

module.exports.deletePerson = (req, res) => {
    Person.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.Json(deleteConfirmation))
        .catch(err => res.json(err))
}