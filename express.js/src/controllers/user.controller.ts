import { Request, Response, NextFunction } from 'express';
import { CreateUserRequest, UpdateUserRequest, UserResponse, UsersListResponse } from '../types/user.types';
import * as userService from '../services/user.service';

// GET /users
export async function getAllUsers(
  req: Request,
  res: Response<UsersListResponse>,
  next: NextFunction
) {
  try {
    const users = await userService.getAllUsers();
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      users,
      total: users.length
    });
  } catch (error) {
    next(error);
  }
}

// GET /users/:id
export async function getUserById(
  req: Request<{ id: string }>,
  res: Response<UserResponse>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);
    res.json({
      success: true,
      message: 'User retrieved successfully',
      user
    });
  } catch (error) {
    next(error);
  }
}

// POST /users
export async function createUser(
  req: Request<{}, {}, CreateUserRequest>,
  res: Response<UserResponse>,
  next: NextFunction
) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user
    });
  } catch (error) {
    next(error);
  }
}

// PUT /users/:id
export async function updateUser(
  req: Request<{ id: string }, {}, UpdateUserRequest>,
  res: Response<UserResponse>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updatedUser = await userService.updateUser(id, req.body);
    res.json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /users/:id
export async function deleteUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await userService.deleteUser(id);
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}
