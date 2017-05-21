var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://localhost:27017/guaridaAdmin", ["reservas"]);

//Me devuelve todas las reservas que se tienen que confirmar en la DB
router.get("/reservations", function(req, res, next) {
    db.reservas.find(function(err,reservas){
        if(err){
            res.send(err);
        } 
        res.json(reservas);
    });
});

router.get("/reservation/:id", function(req, res, next){
    db.reservas.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, reserva){
        if(err){
            res.send(err);
        } else {
            res.json(reserva);
        }
    });
});

//Guardo reservas a la DB
router.post("/reservation", function(req, res, next){
    reserva = req.body;
    db.reservas.save(reserva, function(err, reserva){
        if(err){
            res.send(err);
        }
        res.json(reserva);
    });
});

//Borra una reserva de la DB
router.delete("/reservation/:id", function(req, res, next){
    db.reservas.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, reserva){
        if(err){
            res.send(err);
        } else {
            console.log(reserva);
            res.json(reserva);
        }
    });
});

//Actualiza una reserva en la db
router.put("reservation/:id", function(req, res, next){
    var reservation = req.body;
    var updReservation = {};
    
    if(reservation.Status){
        updReservation.Status = reservation.Status
    }

    if(!updReservation){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.reservas.update({_id: mongojs.ObjectId(req.params.id)}, updReservation, {}, function(err, reserva){
            if(err){
                res.send(err);
            }
            res.json(reserva);
        });
    }
})

module.exports = router;