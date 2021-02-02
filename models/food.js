module.exports = function(sequelize, DataTypes) {
    return sequelize.define ('food', {
        food_group: DataTypes.STRING,
        name: DataTypes.STRING,
        calories: DataTypes.INTEGER,
        ingredients: DataTypes.ARRAY(DataTypes.TEXT),
        image_url: DataTypes.TEXT
        // owner_id: DataTypes.INTEGER  //this will point to a specific user on the users table
    });
};