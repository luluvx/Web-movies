const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movies = require("./movie.model.js")(sequelize, Sequelize);
db.persons = require("./person.model.js")(sequelize, Sequelize);




// uno a uno- movie-persons
db.movies.belongsTo(db.persons, {
    as: "director",  
    foreignKey: "directorId", 
});
db.persons.hasOne(db.movies, {
    as: "directedMovie",  
    foreignKey: "directorId",
});


// many to many movies-persons 
db.movies.belongsToMany(db.persons, {
    through: "movie_person",
    as: "actors",
    foreignKey: "movieId",
});
db.persons.belongsToMany(db.movies, {
    through: "movie_person",
    as: "movies",
    foreignKey: "personId",
});

module.exports = db;