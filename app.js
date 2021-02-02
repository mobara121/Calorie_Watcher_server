require('dotenv').config();

var express =require('express');
var app =express();
var user = require('./controllers/usercontroller')
var calorie = require('./controllers/caloriecontroller');
var food = require('./controllers/foodcontroller');
var sequelize = require('./db');
// const { Pool } = require('pg');

sequelize.sync(); //to reset tables after changing models, input {force: true} into the parens, save and let run, then delete and let run

app.use(express.json());
app.use(require('./middleware/headers'));
app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/calorie', calorie);
app.use('/food', food);

app.listen(process.env.PORT || 3000, function(){
    console.log('App is listening on 3000')
})