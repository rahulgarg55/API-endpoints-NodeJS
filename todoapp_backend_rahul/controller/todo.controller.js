const http = require('http');
const Book = require('../models/todo');
const HttpStatus = require('http-status-codes');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.writeHead(HttpStatus.StatusCodes.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(books));
  } catch (error) {
    res.writeHead(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const getBookByNumber = async (req, res) => {
  const booknumber = req.params.booknumber;
  try {
    const book = await Book.findOne({ booknumber });
    if (book) {
      res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(book));
    } else {
      res.writeHead(HttpStatus.StatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
      res.end();
    }
  } catch (error) {
    res.writeHead(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

// Create a new book
const createBook = async (req, res) => {
  const { booknumber, title, author } = req.body;
  const book = new Book({
    booknumber,
    title,
    author,
    createdOn: new Date(),
  });

  try {
    await book.save();
    res.writeHead(HttpStatus.StatusCodes.CREATED, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(book));
  } catch (error) {
    res.writeHead(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

// Update a specific book by booknumber
const updateBook = async (req, res) => {
  const booknumber = req.params.booknumber;
  const { title, author } = req.body;

  try {
    const book = await Book.findOne({ booknumber });

    if (book) {
      book.title = title;
      book.author = author;
      book.createdOn = new Date();
      await book.save();
      res.writeHead(HttpStatus.StatusCodes.NO_CONTENT);
      res.end();
    } else {
      res.writeHead(HttpStatus.StatusCodes.NOT_FOUND);
      res.end();
    }
  } catch (error) {
    res.writeHead(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

// Delete a specific book by booknumber
const deleteBook = async (req, res) => {
  const booknumber = req.params.booknumber;

  try {
    const book = await Book.findOne({ booknumber });

    if (book) {
      await book.deleteOne();
      res.writeHead(HttpStatus.StatusCodes.NO_CONTENT);
      res.end();
    } else {
      res.writeHead(HttpStatus.StatusCodes.NOT_FOUND);
      res.end();
    }
  } catch (error) {
    res.writeHead(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

module.exports = {
  getBooks,
  getBookByNumber,
  createBook,
  updateBook,
  deleteBook,
};
