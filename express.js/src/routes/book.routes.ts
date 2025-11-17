import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';

const router = Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'MODERATOR'),
  validate(createBookSchema),
  bookController.createBook
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'MODERATOR'),
  validate(updateBookSchema),
  bookController.updateBook
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  bookController.deleteBook
);

export const bookRoutes = router;
