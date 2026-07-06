import type { Request, Response } from 'express';
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService} from '../services/productsServices.js'


const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los productos" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";
    const product = await getProductByIdService(id);
    if (!product) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await createProductService(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el producto" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) ?? "";
    const deleted = await deleteProductService(id);
    if (!deleted) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el producto" });
  }
};


export { getAllProducts, getProductById, createProduct, deleteProduct }