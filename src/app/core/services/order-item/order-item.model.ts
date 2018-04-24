import { Order, Product, ScalarDate } from '../models';

export interface OrderItem{
  id: string;
  Order: Order;
  Product: Product;
  quantity: number;
  comment: string;
  is_cancelled: boolean;
  created_at: ScalarDate
}

export interface AddOrderItemInput{
  order_id: string;
  product_id: string;
  quantity: number;
  comment: string;
}

export interface AddInitialOrderItemInput{
  product_id: string;
  quantity: number;
  comment: string;
}

export interface EditOrderItemInput {
  id: string;
  quantity: number;
  comment: string;
}
