var express = require('express');
var router = express.Router();
var books = require('../resources/books');
var Books = require('../models/books');     //mongodbclass

/* GET home page. */
router.get('/', async function (req, res, next) {

  //mongodb class   //async await use gareko
  let books = await Books.find();
  res.render('index', { title: 'Book App', bookList: books });

  // res.render('index', { title: 'Book DB', bookList: books });  //loc done on express class
});




router.get('/biva', function (req, res, next) {
  res.render('index', { title: 'Biva' });
});
module.exports = router;


