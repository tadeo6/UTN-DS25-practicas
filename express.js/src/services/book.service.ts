import prisma from '../config/prisma';
import { Book } from '../generated/prisma';

interface CreateBookDTO {
  title: string;
  author: string;
  price: number;
  stock?: number;
}

interface UpdateBookDTO {
  title?: string;
  author?: string;
  price?: number;
  stock?: number;
}

export async function getAllBooks(): Promise<Book[]> {
  return prisma.book.findMany({ orderBy: { id: 'asc' } });
}

export async function getBookById(id: number): Promise<Book> {
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) {
    const error = new Error('Libro no encontrado') as any;
    error.statusCode = 404;
    throw error;
  }
  return book;
}

export async function createBook(data: CreateBookDTO): Promise<Book> {
  return prisma.book.create({ data });
}

export async function updateBook(id: number, data: UpdateBookDTO): Promise<Book> {
  try {
    return await prisma.book.update({ where: { id }, data });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Libro no encontrado') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}

export async function deleteBook(id: number): Promise<void> {
  try {
    await prisma.book.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Libro no encontrado') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}
