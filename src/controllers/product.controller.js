import * as productService from '../services/product.service.js';

export const getAll = async (_req, res, next) => {
  try { res.json(await productService.getProducts()); } catch (error) { next(error); }
};

export const getById = async (req, res, next) => {
  try { res.json(await productService.getProductById(req.params.id)); } catch (error) { next(error); }
};

export const create = async (req, res, next) => {
  try { res.status(201).json(await productService.createProduct(req.body)); } catch (error) { next(error); }
};

export const update = async (req, res, next) => {
  try { res.json(await productService.updateProduct(req.params.id, req.body)); } catch (error) { next(error); }
};

export const remove = async (req, res, next) => {
  try { await productService.deleteProduct(req.params.id); res.status(204).send(); } catch (error) { next(error); }
};
