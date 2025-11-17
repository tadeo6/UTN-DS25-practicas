import { Role } from '@prisma/client'; // si usas Prisma enums directamente

// Lo que envía el cliente al hacer login
export interface LoginRequest {
  email: string;
  password: string;
}

// Datos del usuario que se devuelven en la respuesta (sin password)
export interface UserData {
  id: number;
  email: string;
  name: string;
  age: number;
  role: Role; // USER | ADMIN | MODERATOR
  createdAt: Date;
}

// Estructura de la respuesta del login
export interface LoginResponse {
  success: boolean;
  data: {
    user: UserData;
    token: string;
  };
}
