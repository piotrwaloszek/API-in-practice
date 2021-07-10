const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
res.json(db.seats[`${req.params.id}`]);
});

router.route('/seats').post((req, res) => {
    req.body.id = uuidv4();
    req.body.day;
    req.body.seat; 
    req.body.client;
    req.body.email;

db.seats.push(req.body);
res.json({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
db.seats[`${req.params.id}`].day = req.body.day;
db.seats[`${req.params.id}`].seat = req.body.seat;
db.seats[`${req.params.id}`].client = req.body.client;
db.seats[`${req.params.id}`].email = req.body.email;
res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
db.seats.splice(`${req.params.id}`, 1);
res.json({message: 'OK'});
});

module.exports = router;