import type { Book } from '../models/booksModel.js'
import { findAll, findById, create, remove } from '../models/booksModel.js';

const getAllProductsService = async (): Promise<Book[]> => {
  return findAll();
};

const getProductByIdService = async (id: string): Promise<Book | undefined> => {
  return findById(id);
};

const createProductService = async (data: Omit<Book, "id">): Promise<Book> => {
  return create(data);
};

const deleteProductService = async (id: string): Promise<boolean> => {
  return remove(id);
};

export { getAllProductsService, getProductByIdService, createProductService, deleteProductService }