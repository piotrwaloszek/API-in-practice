const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
res.json(db.concerts[`${req.params.id}`]);
});

router.route('/concerts').post((req, res) => {
    req.body.id = uuidv4();
    req.body.performer;
    req.body.genre;
    req.body.image;

db.concerts.push(req.body);
res.json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
db.concerts[`${req.params.id}`].performer = req.body.performer;
db.concerts[`${req.params.id}`].genre = req.body.genre;
db.concerts[`${req.params.id}`].image = req.body.image;
res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
db.concerts.splice(`${req.params.id}`, 1);
res.json({message: 'OK'});
});

module.exports = router;