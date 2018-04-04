import { Order, Product, ScalarDate } from '../models';

export interface OrderItem{
  id: string;
  Order: Order;
  Product: Product;
  quantity: number;
  is_cancelled: boolean;
  created_at: ScalarDate
}

export interface AddOrderItemInput{
  order_id: string;
  product_id: string;
  quantity: number;
}
