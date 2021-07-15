const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const concert = db.concerts.find(item => item.id == req.params.id);
    res.json(concert);
});

router.route('/concerts').post((req, res) => {
    req.body.id = uuidv4();
});

router.route('/concerts/:id').put((req, res) => {
    const concert = db.concerts.find(item => item.id == req.params.id);
});

router.route('/concerts/:id').delete((req, res) => {
    const concertToDel = db.concerts.indexOf(db.concerts.find(item => item.id == req.params.id));
    db.concerts.splice(concertToDel, 1);
    res.json({message: 'OK'});
});

module.exports = router;