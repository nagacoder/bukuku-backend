const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBook = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    publication_year: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    publisher: Joi.string().required(),
  }),
};

const getBooks = {
  query: Joi.object().keys({
    title: Joi.string(),
    limit: Joi.number().integer(),
    sortBy: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

const updateBook = {
  params: Joi.object().keys({
    bookId: Joi.required().custom(objectId),
  }),
};

const deleteBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
