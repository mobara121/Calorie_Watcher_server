const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

sequelize.authenticate().then(
    function(){
        console.log('connet to caloriewatcher postgres database');
    },
    function(err){
        console.log(err)
    }
);

module.exports = sequelize;