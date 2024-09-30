module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/movie.controller.js");

    router.get('/', controller.listMovie);
    router.get('/:id', controller.getMovieById);
    router.post('/', controller.createMovie);
    router.put('/:id', controller.updateMoviePut);
    router.patch('/:id', controller.updateMoviePatch);
    router.delete('/:id', controller.deleteMovie);
    router.post('/:id/photo', controller.uploadMoviePhoto);


    //router.post('/:id/actors', controller.insertActors);

    router.get('/:id/actors', controller.getActorsByMovieId);
    router.post('/:id/actors', controller.insertActors);

    router.get('/director/:id', controller.getMoviesByDirectorId);
    router.get('/actor/:id', controller.getMoviesByActorId);




    app.use('/movies', router);

};