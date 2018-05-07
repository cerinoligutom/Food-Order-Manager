import gql from 'graphql-tag';
import { Order } from '../models';

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

export const ChangeOrderFullyPaidStatusMutation = gql`
mutation changeOrderFullyPaidStatus($orderId: ID!, $value: Boolean){
  Order: changeOrderFullyPaidStatus(id: $orderId, value: $value){
    id
    isFullyPaid
    isCancelled
    created_at
  }
}
`;
