var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://localhost:27017/guaridaAdmin", ["guaridaAdmin"]);

//Me devuelve la colecion completa
router.get("/admin", function(req, res, next) {
    db.guaridaAdmin.find(function(err, guaridaAdmin){
        if(err){
            res.send(err);
        } 
        res.json(guaridaAdmin);
    });
});

//Me UNA sola instancia de la colecion
router.get("/admin/:username", function(req, res, next) {
    db.guaridaAdmin.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, guaridaAdmin){
        if(err){
            res.send(err);
        } 
        res.json(guaridaAdmin);
    });
});

//Guardar un admin, no esta completo
router.post("/task", function(req, res, next) {

    var admin = req.body;
    db.guaridaAdmin.findOne({username: "edPR"}, function(err, guaridaAdmin){
        if(err){
            res.send(err);
        } 
        res.json(guaridaAdmin);
    });
});

//Borrar un Admin
router.delete('admin/:id', function(req, res, next){
    db.guaridaAdmin.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, guaridaAdmin){
        if(err){
            res.send(err);
        }
        res.json(guaridaAdmin);
    })
})


module.exports = router;