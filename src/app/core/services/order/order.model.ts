import { Transaction, User, OrderItem } from '../models';

export interface Order {
  id: string;
  isFullyPaid: boolean;
  Transaction: Transaction;
  User: User;
  OrderItems: OrderItem[];
}
