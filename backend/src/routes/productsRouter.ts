import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, deleteProduct } from '../controllers/productsControllers.js';

const productsRouter = Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getProductById);

productsRouter.post("/create", createProduct);

productsRouter.delete("/:id", deleteProduct);

export { productsRouter }

