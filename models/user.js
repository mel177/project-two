module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        twitterId: DataTypes.BIGINT,
        facebookId: DataTypes.BIGINT,  
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        location: DataTypes.STRING, 
        donation: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }, 
        profile_picture: DataTypes.TEXT
        },{
            timestamps: false
        });
    return User;
}