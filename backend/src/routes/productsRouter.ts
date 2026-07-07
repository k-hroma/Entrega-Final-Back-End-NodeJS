import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from '../controllers/productsControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/create", authMiddleware, createProduct);
productsRouter.put("/:id", authMiddleware, updateProduct);
productsRouter.delete("/:id", authMiddleware, deleteProduct);

export { productsRouter }