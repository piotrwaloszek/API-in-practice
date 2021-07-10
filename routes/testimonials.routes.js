const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
res.json(db.testimonials[`${req.params.id}`]);
});

router.route('/testimonials/random').get((req, res) => {
// let randomNum = Math.floor(Math.random() * db.length)
// res.json(db.testimonials[randomNum]);
res.json({message: 'OK'});
});

router.route('/testimonials').post((req, res) => {
    req.body.id = uuidv4();
    req.body.author;
    req.body.text; 

db.testimonials.push(req.body);
res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
db.testimonials[`${req.params.id}`].author = req.body.author;
db.testimonials[`${req.params.id}`].text = req.body.text;
res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
db.testimonials.splice(`${req.params.id}`, 1);
res.json({message: 'OK'});
});

module.exports = router;