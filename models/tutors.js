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

      photo: {
        type: DataTypes.STRING
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
        type: DataTypes.BLOB
      },

      ratings: {
        type: DataTypes.INTEGER
      },

      availability: {
        type: DataTypes.STRING
      }
    });
    Tutor.associate = function(models) {
        Tutor.hasMany(models.Message, {
          onDelete: "cascade"
        });
      };
  return Tutor;
};
