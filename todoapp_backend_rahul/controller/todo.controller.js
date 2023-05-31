const Book = require("../models/todo");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookByNumber = async (req, res) => {
  const booknumber = req.params.booknumber;
  try {
    const book = await Book.findOne({ booknumber });
    if (book) {
      res.status(200).json(book);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      res.sendStatus(204); // No Content
    } else {
      res.sendStatus(404); // Not found
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific book by booknumber
const deleteBook = async (req, res) => {
  const booknumber = req.params.booknumber;

  try {
    const book = await Book.findOne({ booknumber });

    if (book) {
      await book.deleteOne();
      res.sendStatus(204); // No Content
    } else {
      res.sendStatus(404); // Not found
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBooks,
  getBookByNumber,
  createBook,
  updateBook,
  deleteBook,
};
