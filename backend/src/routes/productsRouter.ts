import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, deleteProduct } from '../controllers/productsControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/create", authMiddleware, createProduct);
productsRouter.delete("/:id", authMiddleware, deleteProduct);

export { productsRouter }