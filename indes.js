require('dotenv').config();

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// //Database
// const database = require('./database/database');

//Models

const BookModel = require('./database/book');
const AuthorModel = require('./database/author');
const PublicationModel = require('./database/publication');

//Init:
const booky = express();
booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connection estblished'));

/*
Route             /
Description     Get all books
Access          Public
Parameter       None
Method          Get
*/

booky.get('/', async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

/*
   Route             /is
    Description     Get specific book on isbn
    Access          Public
    Parameter       isbn
    Method          Get 
*/
booky.get('/is/:isbn', async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

  if (!getSpecificBook) {
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
booky.get('/c/:category', async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBook) {
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
booky.get('/author', async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

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
booky.get('/publications', async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});

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

//POST Book route

/*
Route             /book/new
Description     Add new books
Access          Public
Parameter       None
Method          POST
*/

booky.post('/book/new', async (req, res) => {
  const { newBook } = req.body;
  const addNewBook = BookModel.create(newBook);
  return res.json({
    books: addNewBook,
    message: 'Book was added',
  });
});

//POST Author Route

/*
Route             /author/new
Description     Add new authors
Access          Public
Parameter       None
Method          POST
*/
booky.post('/author/new', async (req, res) => {
  const { newAuthor } = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json({
    author: addNewAuthor,
    message: 'Author was added',
  });
});
//POST Publication Route

/*
Route             /publication/new
Description     Add new publications
Access          Public
Parameter       None
Method          POST
*/
booky.post('/publication/new', async (req, res) => {
  const { newPublication } = req.body;
  const addNewPublication = PublicationModel.create(newPublication);
  return res.json({
    Publication: addNewPublication,
    message: 'Publication was added',
  });
});

//PUT requests:
/*
Route             /publication/update/book
Description     Update all add new publication
Access          Public
Parameter       isbn
Method          PUT
*/

booky.put('/publication/update/book/:isbn', (req, res) => {
  //update the publication database
  database.publication.forEach((pub) => {
    if (pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publications = req.body.pubId;
      return;
    }
  });
  return res.json({
    books: database.books,
    publications: database.publication,
    message: 'successfully updated publications',
  });
});

/*
Route             /update/book
Description     Update book on isbn
Access          Public
Parameter       isbn
Method          PUT
*/
booky.put('/book/update/:isbn', async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true,
    }
  );

  return res.json({
    books: updatedBook,
  });
});

/*
Route             /book/author/update
Description     Update book on isbn
Access          Public
Parameter       isbn
Method          PUT
*/
//////////////////////////////////////////////////////////////-------------------------not done
// booky.put('/book/author/update/:isbn', async (req, res) => {
//   //update book database
//   const updatedBook = await BookModel.findOneAndUpdate(
//     {
//       ISBN: req.params.isbn,
//     },

//     {
//       $addToSet: {
//         authors: req.body.newAuthor,
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   //update author database
//   const updatedAuthor = await AuthorModel.findOneAndUpdate(
//     {
//       id: req.body.newAuthor,
//     },
//     {
//       $addToSet: {
//         books: req.params.isbn,
//       },
//     },
//     {
//       new: true,
//     }
//   );
//   console.log(updatedAuthor);
//   console.log(updatedBook);
//   return res.json({
//     books: updatedBook,
//     authors: updatedAuthor,
//     message: 'Authors added',
//   });
// });

booky.put('/book/author/update/:isbn', async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: {
        authors: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

  // update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );
  return res.json({
    books: updatedBook,
    authors: updatedAuthor,
    message: 'New Author was added',
  });
});
//Delete Route:
/*
Route             /book/delete
Description     Delete a Book
Access          Public
Parameter       isbn
Method          DELETE
*/

booky.delete('/book/delete/:isbn', async (req, res) => {
  const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });

  return res.json({
    books: updatedBookDatabase,
  });
});
/*
Route             /book/delete/author
Description     Delete a author from a book
Access          Public
Parameter       isbn,authorid
Method          DELETE
*/
booky.delete('/book/delete/author/:isbn/:authorId', (req, res) => {
  //update the book db

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
      );
      book.author = newAuthorList;
      return;
    }
  });

  //update the author db
  database.author.forEach((eachAuthor) => {
    if (eachAuthor.id === parseInt(req.params.authorId)) {
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = newBookList;
      return;
    }
    return res.json({
      books: database.books,
      author: database.author,
      message: 'successfully updated authors',
    });
  });
});

booky.listen(3000, () => {
  console.log('server is up and running at port 3000');
});
