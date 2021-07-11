const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { testimonials } = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => { 
    const testimonialRandom = db.testimonials.find(item => item.id == Math.floor(Math.random() * (db.testimonials.length - 1)) + 1);
    res.json(testimonialRandom);
});

router.route('/testimonials/:id').get((req, res) => {
    const testimonial = db.testimonials.find(item => item.id == req.params.id);
    res.json(testimonial);
});

router.route('/testimonials').post((req, res) => {
    const {author, text} = req.body;
    req.body.id = uuidv4();

    if (author && text) {
        author;
        text;   
        db.testimonials.push(req.body);
        res.json({message: 'OK'});
    } else {
        res.json({message: 'Please put all informations'});
    }


});

router.route('/testimonials/:id').put((req, res) => {
    const testimonial = db.testimonials.find(item => item.id == req.params.id);
    const {author, text} = req.body;

    if(author && text){
        testimonial.author = author;
        testimonial.text = text;
        res.json({message: 'OK'});
    } else {
        res.json({message: 'Please put all informations'});
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    const testimonialToDel = db.testimonials.indexOf(db.testimonials.find(item => item.id == req.params.id));
    db.testimonials.splice(testimonialToDel, 1);
    res.json({message: 'OK'});
});

module.exports = router;