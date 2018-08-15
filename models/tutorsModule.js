module.exports = function (sequelize, DataTypes) {
  var Tutors = sequelize.define("Tutors", {
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

    bio: {
      type: DataTypes.STRING
    },

    ratings: {
      type: DataTypes.INTEGER
    },

    availability: {
      type: DataTypes.STRING
    }
  });
  return Tutors;
};