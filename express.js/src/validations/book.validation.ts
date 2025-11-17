
import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(200, 'Máx 200 caracteres').trim(),
  author: z.string().min(1, 'El autor es requerido').max(100, 'Máx 100 caracteres').trim(),
  price: z.number().positive('El precio debe ser positivo').max(9999, 'Máx 9999'),
  stock: z.number().int().min(0).default(0),
});

export const updateBookSchema = createBookSchema.partial();
