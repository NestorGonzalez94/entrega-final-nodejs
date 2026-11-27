import * as authService from '../services/auth.service.js';

export const login = (req, res, next) => {
  try { res.json(authService.login(req.body)); } catch (error) { next(error); }
};
