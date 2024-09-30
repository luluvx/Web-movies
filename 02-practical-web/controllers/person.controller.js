const db = require("../models")
const { isRequestValid, sendError500 } = require("../utils/request.utils");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor


exports.listPerson = async (req, res) => {
    try{
        const persons = await db.persons.findAll();
        res.json(persons);
    }catch(error) {
        sendError500(error);
    }
}

exports.getPersonById = async (req, res) => {
    const id = req.params.id;
    try{
        const person = await getPersonOr404(id, res);
        if (!person) {
            return;
        }
        res.json(person);
    }catch(error) {
        sendError500(error);
    }
}

exports.createPerson = async (req, res) => {
    const requiredFields = ['name', 'lastName'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try{
        const person = {
            name: req.body.name,
            lastName: req.body.lastName
        }
        const createdPerson = await db.persons.create(person);
        res.status(201).json(createdPerson);
    }catch(error){
        sendError500(error);
    }
}

exports.updatePersonPatch = async (req, res) => {
    const id = req.params.id;
    try{
        const person = await getPersonOr404(id, res);
        if (!person) {
            return;
        }
        person.name = req.body.name || person.name;
        person.lastName = req.body.lastName || person.lastName;
        await person.save();
        res.json(person);
    }catch(error){
        sendError500(error);
    }
}
exports.updatePersonPut = async (req, res) => {
    const id = req.params.id;
    try{
        const person = await getPersonOr404(id, res);
        if (!person) {
            return;
        }
        const requiredFields = ['name', 'lastName'];
        if(!isRequestValid(requiredFields, req.body, res)){
            return;
        }

        person.name = req.body.name;
        person.lastName = req.body.lastName;
        await person.save();
        res.json(person);
    }catch(error){
        sendError500(error);
    }
}

exports.deletePerson = async (req, res) => {
    const id = req.params.id;
    try{
        const person = await getPersonOr404(id, res);
        if (!person) {
            return;
        }
        await person.destroy();
        res.json({
            msg: 'Persona eliminada correctamente'
        });
    }catch(error){
        sendError500(error);
    }
}
exports.uploadPersonPhoto = async (req, res) => {
    const id = req.params.id;
    try{
        const person = await getPersonOr404(id, res);
        if (!person) {
            return;
        }
        if(!req.files){
            res.status(400).json({
                msg: 'No se ha enviado la imagen'
            });
            return;
        }
        const file = req.files.photoProfile;
        const fileName = person.id + '.jpg';
        file.mv(`public/persons/${fileName}`);
        await person.save();
        res.json(person);
    }catch(error){
        sendError500(error);
    }
}

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



async function getPersonOr404(id, res){
    const person = await db.persons.findByPk(id);
    if (!person) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
    }
    return person;
}