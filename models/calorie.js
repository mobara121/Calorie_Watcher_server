module.exports = function(sequelize, DataTypes) {
    return sequelize.define ('calorie', {
        gender: DataTypes.STRING,
        age: DataTypes.STRING,
        lifestyle: DataTypes.STRING,
        required_calorie: DataTypes.INTEGER,
        // owner_id: DataTypes.INTEGER  //this will point to a specific user on the users table
    });
};