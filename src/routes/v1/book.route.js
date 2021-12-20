const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bookValidation = require('../../validations/book.validation');
const bookController = require('../../controllers/book.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBooks'), validate(bookValidation.createBook), bookController.createBook)
  .get(auth('getUsers', 'manageBooks'), validate(bookValidation.getBooks), bookController.getBooks);

router
  .route('/:bookId')
  .get(auth('getUsers', 'manageBooks'), validate(bookValidation.getBook), bookController.getBook)
  .patch(auth('manageBooks'), validate(bookValidation.updateBook), bookController.updateBook)
  .delete(auth('manageBooks'), validate(bookValidation.deleteBook), bookController.deleteBook);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books management and retrieval
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a Book
 *     description: Only admins can create other Books.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - publication_year
 *               - author
 *               - description
 *               - publisher
 *             properties:
 *               title:
 *                 type: string
 *               publication_year:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                  type: string
 *               publisher:
 *                  type: string
 *             example:
 *               title: Seni Bersikap Bodo Amat
 *               publication_year: 12 Januari 1994
 *               author: Mark Manson
 *               description: Counterintuitive Approach to Living a Good Life is the second book by blogger and author Mark Manson
 *               publisher: Airlangga
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Book'
 *       "400":
 *         $ref: '#/components/responses/BookNotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all books
 *     description: Only admins can retrieve all Book.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Book name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of Books
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a Book
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other books.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Books id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Books'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a book
 *     description: Logged in users can only update their own information. Only admins can update other books.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Books id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publication_year:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                  type: string
 *               publisher:
 *                  type: string
 *             example:
 *               title: Seni Bersikap Bodo Amat
 *               publication_year: 12 Januari 1994
 *               author: Mark Manson
 *               description: Counterintuitive Approach to Living a Good Life is the second book by blogger and author Mark Manson
 *               publisher: Airlangga
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Book'
 *       "400":
 *         $ref: '#/components/responses/BookNotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Book
 *     description: Logged in users can delete only themselves. Only admins can delete other boks.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
