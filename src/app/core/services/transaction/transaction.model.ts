import { Vendor, Order, ScalarDate } from '../models';

export interface Transaction {
  id: number;
  vendor: Vendor;
  description: string;
  delivery_free: number;
  created_at: ScalarDate;
  is_fullfilled: boolean;
    Orders: Order[];
}

export interface TransactionOrders {
  Orders: Order[];
}
