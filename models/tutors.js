module.exports = function(sequelize, DataTypes) {
    var Tutors = sequelize.define("Tutors", {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {

            type: DataTypes.STRING,
            //allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
          },
        
        subjects: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type: DataTypes.TEXT
        },
        photo: {
            type: DataTypes.BLOB,
          },
    
        ratings: {
            type: DataTypes.INTEGER
        },
        
        availability: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
                    } 
    });

    Tutors.associate = function(models) {
        Tutors.hasMany(models.Students, {
            foreignKey: {
                allowNull: false
            }
        });
        Tutors.hasMany(models.Appointments, {
            onDelete: "cascade"
        });
    };
    return Tutors;
};
