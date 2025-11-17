import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/book.service';

export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  try {
    const books = await bookService.getAllBooks();
    res.json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
}

export async function getBookById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: 'ID inválido' });
    const book = await bookService.getBookById(id);
    res.json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
}

export async function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, author, price, stock } = req.body;
    const book = await bookService.createBook({ title, author, price, stock });
    res.status(201).json({
      success: true,
      message: 'Libro creado exitosamente',
      data: book
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: 'ID inválido' });

    const { title, author, price, stock } = req.body;
    const book = await bookService.updateBook(id, { title, author, price, stock });
    res.json({ success: true, message: 'Libro actualizado', data: book });
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: 'ID inválido' });

    await bookService.deleteBook(id);
    res.json({ success: true, message: 'Libro eliminado' });
  } catch (error) {
    next(error);
  }
}
