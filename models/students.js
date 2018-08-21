module.exports = function(sequelize, DataTypes) {

    var Students = sequelize.define("Students", {
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
        type:DataTypes.STRING,
        //allowNull: false,
        },
      password: {
        type: DataTypes.STRING,
        allowNull: false
        },
<<<<<<< HEAD
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        },
      subjects: {
            type: DataTypes.STRING,
            allowNull: false
        }
      });

    Students.associate = function(models) {
      Students.belongsTo(models.Tutors, {
        foreignKey: {
          allowNull: false
=======
      {
        classMethods: {
          associate: function(models) {
            Student.belongsTo(models.User, {
              foreignKey: {
                allowNull: false
                }
              });
            Student.hasMany(models.Appointment, {
              onDelete: "cascade"
              });
            }
>>>>>>> 61df96978fbcd8dc1de463c407ffd1051a49e32f
          }
        });
      Students.hasMany(models.Appointments, {
        onDelete: "cascade"
        });
    }; 
    return Students;
  
  };