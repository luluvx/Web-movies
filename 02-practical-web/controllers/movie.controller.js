const db = require("../models")
const {isRequestValid, sendError500 } = require("../utils/request.utils");



exports.listMovie = async (req, res) => {
    try{
        const movies = await db.movies.findAll();
        res.json(movies);
    }catch(error) {
        sendError500(error);
    }
}
exports.getMovieById = async (req, res) => {
    const id = req.params.id;
    try{
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        res.json(movie);
    } catch (error) {
        sendError500(error);
    }
    
}

exports.createMovie = async (req, res) => {
    const requiredFields = ['title', 'sinopsis', 'releaseDate', 'rating', 'trailer', 'directorId'];
    if(!isRequestValid(requiredFields, req.body, res)){
        return;
    }
    try{
        const movie = {
            title: req.body.title,
            sinopsis: req.body.sinopsis,
            releaseDate: req.body.releaseDate,
            rating: req.body.rating,
            trailer: req.body.trailer,
            directorId: req.body.directorId
        }

        const createdMovie = await db.movies.create(movie);

        res.status(201).json(createdMovie);
    } catch(error){
        sendError500(error);
    }
    
}

exports.updateMoviePatch = async (req, res) => {
    const id = req.params.id;
    try{
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        movie.title = req.body.title || movie.title;
        movie.sinopsis = req.body.sinopsis || movie.sinopsis;
        movie.releaseDate = req.body.releaseDate || movie.releaseDate;
        movie.rating = req.body.rating || movie.rating;
        movie.trailer = req.body.trailer || movie.trailer;
        movie.directorId = req.body.directorId || movie.directorId;
        await movie.save();
        res.json(movie);
    }catch(error){
        sendError500(error);
    }
}
exports.updateMoviePut = async (req, res) => {
    const id = req.params.id;
    try{
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        const requiredFields = ['title', 'sinopsis', 'releaseDate', 'rating', 'trailer', 'directorId'];
        if(!isRequestValid(requiredFields, req.body, res)){
            return;
        }
        movie.title = req.body.title;
        movie.sinopsis = req.body.sinopsis;
        movie.releaseDate = req.body.releaseDate;
        movie.rating = req.body.rating;
        movie.trailer = req.body.trailer;
        movie.directorId = req.body.directorId;

        await movie.save();
        res.json(movie);
    }catch(error){
        sendError500(error);
    }
}

exports.deleteMovie = async (req, res) => {
    const id = req.params.id;
    try{
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        await movie.destroy();
        res.json({
            msg: 'Pelicula eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }       
}
exports.uploadMoviePhoto = async (req, res) => {
    const id = req.params.id;
    try{
        const movie = await getMovieOr404(id, res);
        if (!movie) {
            return;
        }
        if(!req.files){
            res.status(400).json({
                msg: 'No se ha enviado ninguna imagen'
            });
            return;
        }
        const file = req.files.photoMovieProfile;
        const fileName = movie.id + '.jpg';
        file.mv(`public/movies/${fileName}`);
        await movie.save();
        res.json(movie);
    } catch (error) {
        sendError500(error);
    }
}
exports.getActorsByMovieId = async (req, res) => {
    const id = req.params.id;
    const movie = await db.movies.findByPk(id, {
        include: 'actors'
    });
    if (!movie) {
        res.status(404).json({
            msg: 'Pelicula no encontrada'
        });
        return;
    }
    res.json(movie.actors);

}

exports.insertActors = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await db.movies.findByPk(id);

        if (!movie) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }

        let actorList = req.body.actors;

        if (!Array.isArray(actorList)) {
            actorList = [actorList];
        }

     
        await movie.setActors(actorList);

        const updatedMovie = await db.movies.findByPk(id, {
            include: 'actors'
        });

        res.json(updatedMovie.actors);

    } catch (error) {
        console.error("Error al insertar actores:", error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

//movies by directorId
exports.getMoviesByDirectorId = async (req, res) => {
    const directorId = req.params.id;
    try{
        const movies = await db.movies.findAll({
            where: {
                directorId: directorId
            }
        });
        res.json(movies);
    }catch(error){
        sendError500(error);
    }
}

//movies by actorId
exports.getMoviesByActorId = async (req, res) => {
    const actorId = req.params.id;
    try{
        const movies = await db.movies.findAll({
            include: {
                model: db.persons,
                as: 'actors',
                where: {
                    id: actorId
                }
            }
        });
        res.json(movies);
    }catch(error){
        sendError500(error);
    }
}





async function getMovieOr404(id, res) {
    const movie = await db.movies.findByPk(id);
    if (!movie) {
        res.status(404).json({
            msg: 'Pelicula no encontrada'
        });
        return;
    }
    return movie;
}

