const express = require('express');

//Database
const database = require('./database');

//Init:
const booky = express();

/*
Route             /
Description     Get all books
Access          Public
Parameter       None
Method          Get
*/

booky.get('/', (req, res) => {
  return res.json({ books: database.books });
});

/*
   Route             /is
    Description     Get specific book on isbn
    Access          Public
    Parameter       isbn
    Method          Get 
*/
booky.get('/is/:isbn', (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length == 0) {
    return res.json({
      error: `No note book found for the isbn ${req.params.isbn}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

/*
    Route             /c
    Description     Get specific book on specific category
    Access          Public
    Parameter       category
    Method          Get 
*/
booky.get('/c/:category', (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book is found for category ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
    Route             /l
    Description     Get specific book on specific language
    Access          Public
    Parameter       language
    Method          Get 
*/
booky.get('/l/:language', (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.language === req.params.language
  );

  if (getSpecificBook.length == 0) {
    return res.json({
      error: `No note book found for the language ${req.params.language}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

/*
    Route             /author
    Description     Get all authors
    Access          Public
    Parameter       None
    Method          Get 
*/
booky.get('/author', (req, res) => {
  return res.json({ authors: database.author });
});

//assignment ---- 1 route
/*
    Route             /author/id/:id
    Description     Get specific author based on id
    Access          Public
    Parameter       id
    Method          Get 
*/
booky.get('/author/id/:id', (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.id == req.params.id
  );

  if (getSpecificAuthor.length == 0) {
    return res.json({
      error: `No author found with id ${req.params.id}`,
    });
  }
  return res.json({ author: getSpecificAuthor });
});

/*
    Route             /author/book
    Description     Get specific author based on book
    Access          Public
    Parameter       ISBN
    Method          Get 
*/
booky.get('/author/book/:isbn', (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No author found for the book of ${req.params.isbn} isbn`,
    });
  }
  return res.json({ authors: getSpecificAuthor });
});

/*
    Route             /publications
    Description     Get all publications
    Access          Public
    Parameter       None
    Method          Get 
*/
booky.get('/publications', (req, res) => {
  return res.json({ publications: database.publication });
});

//assignment 2 routes ----
/*
    Route             /publications/id/:id
    Description     Get specific publication
    Access          Public
    Parameter       None
    Method          Get 
*/
booky.get('/publications/id/:id', (req, res) => {
  const getSpecificPub = database.publication.filter(
    (publication) => publication.id == req.params.id
  );
  if (getSpecificPub.length === 0) {
    return res.json({
      error: `No Publications found for the id ${req.params.id} `,
    });
  }
  return res.json({ publications: getSpecificPub });
});

booky.listen(3000, () => {
  console.log('server is up and running at port 3000');
});

/*
    Route             /publications/book
    Description     Get specific publication
    Access          Public
    Parameter       None
    Method          Get 
*/
booky.get('/publication/:book', (req, res) => {
  const getSpecificPub = database.publication.filter((publication) =>
    publication.books.includes(req.params.book)
  );

  if (getSpecificPub.length === 0) {
    return res.json({
      error: `No publications found for the book of ${req.params.book}`,
    });
  }
  return res.json({ publications: getSpecificPub });
});
