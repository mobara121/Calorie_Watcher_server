var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user.js');
var Calorie = sequelize.import('../models/calorie.js');

//POST new calorie
router.post('/create', (req, res) => {
    
    Calorie.create({
        gender: req.body.calorie.gender,
        age: req.body.calorie.age,
        lifestyle: req.body.calorie.lifestyle,
        required_calorie: req.body.calorie.required_calorie,
        // owner_id: req.user.id
    })
        .then(calorie => res.status(200).json({
            calorie: calorie
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
 })

 //get all calories
router.get('/get', function(req, res){
    // var userid = req.user.id;
    Calorie
        .findAll({
            // where: {owner_id: userid}
            // where: { id: req.body.calorie.id, gender: req.body.calorie.gender, age: req.body.calorie.age, lifestyle: req.body.calorie.lifestyle}
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

// //get single calorie by id
router.get('/get/:id', function(req, res){

        Calorie
            .findOne({
                where: { gender: req.body.calorie.gender, age: req.body.calorie.age, lifestyle: req.body.calorie.lifestyle}
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

// //get single calorie by gender/age/lifestyle
router.get('/get/:gender/:age/:lifestyle', function(req, res){
    var gender = req.params.gender;
    var age = req.params.age;
    var lifestyle = req.params.lifestyle;
    Calorie
        .findOne({
            where: { gender: gender, age: age, lifestyle: lifestyle}
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
    var caloriePK = req.params.id;
    var updateData = req.body.calorie

   Calorie.update(updateData,
       {where: {id: caloriePK}
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
   Calorie.destroy({
       where: {
           id: data
       }
   })
   .then (
    function deleteInfoSuccess(data){
        res.send("you removed a required calorie-data");
    },
    function deleteInfoError(err){
        res.send(500, err.message);
    }
);
});

module.exports = router;