export interface Product {
  id: string;
  name: string;
  price: number; // Keep as number for math
  image: string;
  category?: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}