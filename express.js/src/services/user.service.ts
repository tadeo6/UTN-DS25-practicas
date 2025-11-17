import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { CreateUserRequest, UpdateUserRequest, UserData } from '../types/user.types';

// Obtener todos los usuarios (sin password)
export async function getAllUsers(limit: number = 10): Promise<UserData[]> {
  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' },
    take: limit
  });

  return users.map(({ password, ...rest }) => rest);
}

// Obtener usuario por ID
export async function getUserById(id: number): Promise<UserData> {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    const error = new Error('Usuario no encontrado') as any;
    error.statusCode = 404;
    throw error;
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Crear usuario
export async function createUser(data: CreateUserRequest): Promise<UserData> {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) {
    const error = new Error('Email ya registrado') as any;
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword
    }
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Actualizar usuario
export async function updateUser(id: number, data: UpdateUserRequest): Promise<UserData> {
  try {
    const updateData: Partial<UpdateUserRequest> = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    } else {
      delete (updateData as any).password;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Usuario no encontrado') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}

// Eliminar usuario
export async function deleteUser(id: number): Promise<void> {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Usuario no encontrado') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}