import gql from 'graphql-tag';
import { Order, AddOrderItemInput } from '../models';

export interface AddOrderInput {
  transaction_id: string;
  user_id: string;
  comment: string;
  orderItems: AddOrderItemInput
}

export interface OrderMutationResponse{
  Order: Order;
}

export const AddOrderMutation = gql`
 mutation addOrder($addOrderInput: AddOrderInput) {
   Order: addOrder(input: $addOrderInput) {
     id
     comment
     User {
       id
       username
       image
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
    comment
    isFullyPaid
    created_at
  }
}
`;
