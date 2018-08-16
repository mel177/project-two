module.exports = function(sequelize, DataTypes) {

    var Student = sequelize.define("Student", {
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
        allowNull: false,
        },
      password: {
        type: DataTypes.STRING,
        allowNull: false
        },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        },
      subjects: {
            type: DataTypes.STRING,
            allowNull: false
        }
      }, {
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
          }
        });
    return Student;
  
  };