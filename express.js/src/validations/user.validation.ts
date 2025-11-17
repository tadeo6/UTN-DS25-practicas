import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim(),

  password: z.string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),

  name: z.string()
    .min(2, 'El nombre debe tener mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .trim(),

  role: z.enum(['USER', 'ADMIN', 'MODERATOR'])
    .optional()
    .default('USER')
});

// Schema para actualización (todos opcionales, pero sin default)
export const updateUserSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim()
    .optional(),

  password: z.string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .optional(),

  name: z.string()
    .min(2, 'El nombre debe tener mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .trim()
    .optional(),

  role: z.enum(['USER', 'ADMIN', 'MODERATOR'])
    .optional()
});
