module.exports = function(sequelize, DataTypes) {
  var Tutor = sequelize.define(
    "Tutor",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING
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
      ratings: {
        type: DataTypes.INTEGER
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
    },
    {
      classMethods: {
        associate: function(models) {
          Tutor.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
          Tutor.hasMany(models.Appointment, {
            onDelete: "cascade"
          });
          Tutor.hasMany(models.Appointment, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Tutor;
};
