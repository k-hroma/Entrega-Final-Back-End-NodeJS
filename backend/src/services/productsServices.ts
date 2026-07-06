// Placeholder en memoria - se reemplaza por Firestore en el Paso 6
interface Product {
  id: string;
  title: string;
  authorLastname: string;
  authorFirsttname: string;
  price: number;
}

const products: Product[] = [];

const getAllProductsService = async (): Promise<Product[]> => {
  return products;
};

const getProductByIdService = async (id: string): Promise<Product | undefined> => {
  return products.find((p) => p.id === id);
};

const createProductService = async (data: Omit<Product, "id">): Promise<Product> => {
  const newProduct: Product = { id: Date.now().toString(), ...data };
  products.push(newProduct);
  return newProduct;
};

const deleteProductService = async (id: string): Promise<boolean> => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

export { getAllProductsService, getProductByIdService, createProductService, deleteProductService }