import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .email('Debe ser un email válido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z.string()
    .email('Debe ser un email válido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
});
