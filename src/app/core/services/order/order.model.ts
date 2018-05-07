import { Transaction, User, OrderItem, AddInitialOrderItemInput } from '../models';

export interface Order {
  id: string;
  isFullyPaid: boolean;
  Transaction: Transaction;
  User: User;
  OrderItems: OrderItem[];
}

export interface AddOrderInput {
  transaction_id: string;
  user_id: string;
  orderItems: AddInitialOrderItemInput[]
}
