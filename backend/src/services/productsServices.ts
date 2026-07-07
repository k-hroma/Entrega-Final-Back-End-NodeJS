import type { Book } from '../models/booksModel.js'
import { findAll, findById, create, update, remove } from '../models/booksModel.js';

const getAllProductsService = async (): Promise<Book[]> => {
  return findAll();
};

const getProductByIdService = async (id: string): Promise<Book | undefined> => {
  return findById(id);
};

const createProductService = async (data: Omit<Book, "id">): Promise<Book> => {
  return create(data);
};

const updateProductService = async (
  id: string,
  data: Partial<Omit<Book, "id">>
): Promise<Book | undefined> => {
  return update(id, data);
};

const deleteProductService = async (id: string): Promise<boolean> => {
  return remove(id);
};

export {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
}