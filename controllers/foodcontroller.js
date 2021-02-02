var router = require('express').Router();
// const { Op } = require('sequelize');
var sequelize = require('../db');
var Food = sequelize.import('../models/food.js');
var User = sequelize.import('../models/user.js');
// const Op = sequelize.Op;

//POST new food
router.post('/create', (req, res) => {
    
    Food.create({
        food_group: req.body.food.food_group,
        name: req.body.food.name,
        calories: req.body.food.calories,
        ingredients: req.body.food.ingredients,
        image_url: req.body.food.image_url
    })
        .then(food => res.status(200).json({
            food: food
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
 })

 //get all foods
 router.get('/get', function(req, res){

    Food
        .findAll({
            // where: { foodid: req.body.food.id, food_group: req.body.food.food_group, name: req.body.food.name}
        })
        .then (
            function findAllSuccess(data){
                res.json(data);
            },
            function findAllSError(err){
                res.send(500, err.message);
            }
        );
});

// //get single food by food_group/calorie
router.get('/get/:food_group/:calories', function(req, res){
// router.get('/get/:food_group', function(req, res){
    var food_group = req.params.food_group;
    var calories = req.params.calories;
    
    Food
        .findAll({
            where: { food_group: food_group, calories: {$lte: calories} }
            // where: { food_group: food_group }
        })
        
        .then (
            
            function findOneSuccess(data){
                res.json(data);            
            },
            function findOneError(err){
                res.send(500, err.message);
            }
        );
});

//UPDATE
router.put('/update/:id', (req,res)=>{
    var foodPK = req.params.id;
    var updateData = req.body.food

   Food.update(updateData,
       {where: {id: foodPK}
   })
   .then(info => res.status(200).json({updateData})
   )
.catch(err => res.status(500).json({
    error: err
}))
});

//DELETE
router.delete('/delete/:id', (req,res)=>{
    var data = req.params.id
   Food.destroy({
       where: {
           id: data
       }
   })
   .then (
    function deleteInfoSuccess(data){
        res.send("you removed a required food-data");
    },
    function deleteInfoError(err){
        res.send(500, err.message);
    }
);
});

module.exports = router;