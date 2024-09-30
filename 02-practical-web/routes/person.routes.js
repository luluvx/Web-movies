module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/person.controller");

    router.get('/', controller.listPerson);
    router.get('/:id', controller.getPersonById);
    router.post('/', controller.createPerson);
    router.put('/:id', controller.updatePersonPut);
    router.patch('/:id', controller.updatePersonPatch);
    router.delete('/:id', controller.deletePerson);
    router.post('/:id/photo', controller.uploadPersonPhoto);
    
    app.use('/persons', router);

};