import {
  Product,
  ProductId,
} from 'src/types-and-interfaces/products/products.type';

export const addHandler = (product: Product) => (products: Product[]) => {
  console.log(products);
  return [...products, product];
};

export const editHandler = (product: Product) => (products: Product[]) => {
  const removedProducts = products.filter((p) => p.id !== product.id);
  return [...removedProducts, product];
};

export const deleteHandler =
  (productId: ProductId) => (products: Product[]) => {
    const removedProducts = products.filter((p) => p.id !== productId);
    return removedProducts;
  };
