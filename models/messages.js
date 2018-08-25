module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define("Message", {
    to: {
      type: DataTypes.STRING,
      allowNull: false
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT
      //allowNull: false
    }
  });
  return Messages;
};
