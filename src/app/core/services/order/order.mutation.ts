import gql from 'graphql-tag';
import { Order, AddInitialOrderItemInput } from '../models';

export interface AddOrderInput {
  transaction_id: string;
  user_id: string;
  orderItems: AddInitialOrderItemInput[]
}

export interface OrderMutationResponse{
  Order: Order;
}

export const AddOrderMutation = gql`
 mutation addOrder($addOrderInput: AddOrderInput) {
   Order: addOrder(input: $addOrderInput) {
     id
     User {
       id
       username
       image
       full_name
     }
     Transaction {
       id
       Host {
         id
       }
     }
     OrderItems {
       id
       Product {
         id
         name
         price
         image
       }
       quantity
       is_cancelled
     }
     created_at
   }
 }
`;

export const CancelOrderMutation = gql`
mutation cancelOrder($orderId: ID!) {
  Order: cancelOrder(id: $orderId) {
    id
    isFullyPaid
    created_at
  }
}
`;
