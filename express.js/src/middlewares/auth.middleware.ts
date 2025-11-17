import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender tipo Request para TypeScript
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: 'USER' | 'ADMIN' | 'MODERATOR';
      }
    }
  }
}

// Middleware de autenticación
export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no definido en el entorno');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: number;
      email: string;
      role: 'USER' | 'ADMIN' | 'MODERATOR';
    };

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error: any) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, error: 'Token expirado' });
    }
    res.status(401).json({ success: false, error: 'Token inválido' });
  }
}

// Middleware de autorización por roles
export function authorize(...roles: ('USER' | 'ADMIN' | 'MODERATOR')[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'No autenticado' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'No tienes permisos para esta acción' });
    }
    next();
  };
}
