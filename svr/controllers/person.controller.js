const { Person } = require('../models/person.model');

module.exports.index = (req, res) => {
  res.json({
    title: 'Book Bay Drag',
  });
};

const createPerson = async (req, res) => {
  try {
    const newPerson = await Person.create(req.body);
    res.json(newPerson);
  } catch (error) {
    res.json(error);
  }
};

const getAllPeople = async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    res.json(error);
  }
};

const getOnePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    res.json(person);
  } catch (error) {
    res.json(error);
  }
};

const updatePerson = async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );
    res.json(updatedPerson);
  } catch (error) {
    res.json(error);
  }
};

const deletePerson = async (req, res) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

const PersonController = {
  createPerson,
  getAllPeople,
  getOnePerson,
  updatePerson,
  deletePerson,
};

export default PersonController;
