import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(authenticateToken);

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/create', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

export default router;
