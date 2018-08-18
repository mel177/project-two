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
      });

    Students.associate = function(models) {
      Students.belongsTo(models.Tutors, {
        foreignKey: {
          allowNull: false
          }
        });
      Students.hasMany(models.Appointments, {
        onDelete: "cascade"
        });
    }; 
    return Students;
  
  };