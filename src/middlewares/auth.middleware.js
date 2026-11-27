import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

export const authenticateToken = (req, _res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return next(new AppError('Token de autenticación requerido', 401));
  }

  const token = authorization.split(' ')[1];
  if (!process.env.JWT_SECRET) {
    return next(new AppError('JWT_SECRET no está configurado en el servidor', 500));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(new AppError('Token inválido o vencido', 403));
  }
};
