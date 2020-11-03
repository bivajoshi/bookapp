var express = require('express');
var router = express.Router();
var books = require('../resources/books');

router.get('/add', function (req, res, next) {
    res.render('addBooks', {
        title: 'Add book',
    });
});


// add post router for save or to post data
router.post('/save', function (req, res) {
    console.log('in save function ....', req.body);
    books.push({ ...req.body, _id: `00${books.length + 1}` });
    res.redirect('/');
});

// router for deleting books using index
router.get('/remove/:index', function (req, res) {
    books.splice(req.params.index, 1);
    res.redirect('/');   //redirecting to homepage
});

//router for editing
router.get('/edit/:_id', function (req, res) {
    const book = books.find((book) => book._id === req.params._id);
    console.log("book to edit.....", book);
    res.render('editBooks', {
        title: 'Edit book',
        book
    });
})

//router for editing_save
router.post('/edit_add/:_id', function (req, res) {
    console.log('in edit_save function...', req.body);
    books.splice(req.params._id - 1, 1, req.body);
    res.redirect('/');
});


module.exports = router;

