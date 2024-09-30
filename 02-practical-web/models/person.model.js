module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Person;
}
