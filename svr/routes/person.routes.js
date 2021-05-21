const PersonController = require('../controllers/person.controller');

module.exports = (app) => {
//Performer API calls to DB
    app.get('/api', PersonController.index);
    app.get('/api/people', PersonController.getAllPeople);
    app.get('/api/person/:id', PersonController.getOnePerson);
    app.post('/api/person', PersonController.createPerson);
    app.put('/api/person/:id', PersonController.updatePerson);
    app.delete('/api/person/:id', PersonController.deletePerson);
}