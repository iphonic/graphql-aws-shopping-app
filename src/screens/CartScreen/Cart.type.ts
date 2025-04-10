export interface CartItem {
  id?: number;
  name: string;
  content: string;
  metadata: {
    quantity: number;
    price: number;
    image?: string;
    category: string;
    rating: number;
    reviews: number;
    [key: string]: any;
  };
}
