module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movie", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sinopsis:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        releaseDate:{
            type: Sequelize.DATE,
            allowNull: false,

        },
        rating: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
        trailer:{
            type: Sequelize.STRING,
            allowNull: false
        },
        directorId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
        
    });
    return Movie;
}
