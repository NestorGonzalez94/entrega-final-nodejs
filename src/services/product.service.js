import * as productModel from '../models/product.model.js';
import AppError from '../errors/AppError.js';

const validateProduct = (product, partial = false) => {
  if (!product || typeof product !== 'object') {
    throw new AppError('El cuerpo de la petición debe contener un producto válido', 400);
  }
  if (!partial && (!product.name || typeof product.name !== 'string')) {
    throw new AppError('El campo "name" es obligatorio y debe ser texto', 400);
  }
  if (product.price !== undefined && (typeof product.price !== 'number' || product.price < 0)) {
    throw new AppError('El campo "price" debe ser un número mayor o igual a cero', 400);
  }
};

export const getProducts = () => productModel.findAll();

export const getProductById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) throw new AppError('Producto no encontrado', 404);
  return product;
};

export const createProduct = async (product) => {
  validateProduct(product);
  return productModel.create(product);
};

export const updateProduct = async (id, product) => {
  validateProduct(product, true);
  const updated = await productModel.update(id, product);
  if (!updated) throw new AppError('Producto no encontrado', 404);
  return updated;
};

export const deleteProduct = async (id) => {
  const deleted = await productModel.remove(id);
  if (!deleted) throw new AppError('Producto no encontrado', 404);
};
