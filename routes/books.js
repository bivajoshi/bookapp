var express = require('express');
var router = express.Router();
var books = require('../resources/books');
let Books = require('../models/books');    //done on mongodb class

router.get('/add', function (req, res, next) {
    res.render('addBooks', {
        title: 'Add book',
    });
});


// add post router for save or to post data
router.post('/save', function (req, res) {
    console.log('in save function ....', req.body);
    // books.push({ ...req.body, _id: `00${books.length + 1}` });  //this loc done on express class

    const book = new Books(req.body);  //instance create garcha  //these loc done on mongodb class
    let promise = book.save();
    promise.then(() => {
        console.log('Book added');
        res.redirect('/');
    });

});

// router for deleting books using index
router.get('/remove/:id', function (req, res) {
    //console.log(req.params.id);             //mongodb class
    Books.remove({ _id: req.params.id }, function () {
        res.redirect('/');
    })
    //  books.splice(req.params.index, 1);
    // res.redirect('/');   //redirecting to homepage
});

//router for editing
router.get('/edit/:id', function (req, res) {
    /*const book = books.find((book) => book._id === req.params._id);
    console.log("book to edit.....", book);
    res.render('editBooks', {
        title: 'Edit book',
        book
    });*/


    Books.findOne({ _id: req.params.id }, function (err, book) {
        res.render('editBooks', { title: 'Edit book', book: book });
    })
});

//router for editing_save
router.post('/edit_add/:id', function (req, res) {
    /* console.log('in edit_save function...', req.body);
     let headIndex = books.findIndex((book) => book._id === req.params._id);
     books.splice(headIndex, 1, { ...req.body, _id: req.params._id });*/

    Books.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, book) {
        console.log('edit display/save');
        console.log(book);
        res.redirect('/');
    })
});


module.exports = router;

