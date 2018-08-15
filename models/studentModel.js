module.exports = function (sequelize, DataTypes) {
    var Students = sequelize.define("Students", {

        name: {
            type: DataTypes.STRING
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {

            type: DataTypes.INTEGER,

        }
    });
    return Students;
};