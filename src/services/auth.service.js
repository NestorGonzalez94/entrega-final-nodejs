import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

export const login = ({ email, password } = {}) => {
  if (!email || !password) throw new AppError('Email y contraseña son obligatorios', 400);
  if (!process.env.AUTH_EMAIL || !process.env.AUTH_PASSWORD || !process.env.JWT_SECRET) {
    throw new AppError('Faltan variables de autenticación en el servidor', 500);
  }
  if (email !== process.env.AUTH_EMAIL || password !== process.env.AUTH_PASSWORD) {
    throw new AppError('Credenciales inválidas', 401);
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '2h' });
  return { token, tokenType: 'Bearer' };
};
