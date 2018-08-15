module.exports = function (sequelize, DataTypes) {
    var Appointments = sequelize.define("Appointments", {
    name: {
        type: DataTypes.STRING
      },
    date: {
        type: DataTypes.INTEGER
      },
    time: {
        type: DataTypes.STRING
      }
    });
    return Appointments;
  };