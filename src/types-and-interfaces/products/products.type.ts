export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type ProductId = Product['id'];
