export interface ProductInterface {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: number;
  hasPrime: boolean;
}

export interface OrderInterface {
  id: string;
  amount: number;
  amountShipping: number;
  images: string[];
  timestamp: number;
  items: ProductInterface[];
}
