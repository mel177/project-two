module.exports = function(sequelize, DataTypes) {
  var Tutors = sequelize.define("Tutors", {
    name: {type: DataTypes.STRING},
    description: DataTypes.TEXT
  });
  return Tutors;
};
