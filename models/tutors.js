module.exports = function(sequelize, DataTypes) {
  var Tutor = sequelize.define("Tutor", {
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
    photo: {
      type: DataTypes.STRING
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
      allowNull: false,
      default: "null"
    }
  });

  Tutor.associate = function(models) {
    Tutor.hasMany(models.Message, {
      onDelete: "cascade"
    });
  };

  return Tutor;
};
