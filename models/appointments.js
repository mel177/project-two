module.exports = function(sequelize, DataTypes) {

    var Appointments = sequelize.define("Appointments", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: [["math", "reading", "webDevelopment"]]
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                isAfter: "2018-01-01",
                isBefore: "2019-01-01",
                notEmpty: true,
            }
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        hours: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDecimal: true,
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                notEmpty: true
            }
        }

    });

    Appointments.associate = function(models) {
        Appointments.belongsTo(models.Tutors, {
            foreignKey: {
                allowNull: false
            },
            primaryKey: true
        });
        Appointments.belongsTo(models.Students, {
            foreignKey: {
                allowNull: false
            },
            primaryKey: true
        });
    };
    return Appointments;
};