import gql from 'graphql-tag';
import { OrderItem } from '@app/models';

export interface OrderItemMutationResponse{
  OrderItem: OrderItem;
}


export const EditOrderItemMutation = gql`
mutation editOrderItem($editOrderItemInput: EditOrderItemInput) {
  OrderItem: editOrderItem(input: $editOrderItemInput) {
    id
    quantity
    comment
  }
}
`;

export const CancelOrderItemMutation = gql`
mutation cancelOrderItem($orderItemId: ID!) {
  OrderItem: cancelOrderItem(id: $orderItemId){
    id
  }
}
`;

export const AddOrderItemMutation = gql`
  mutation addOrderItem($addOrderItemInput: [AddOrderItemInput]) {
    OrderItem: addOrderItems(input: $addOrderItemInput) {
      id
      Order {
        id
      }
      Product{
        id
        name
        price
        image
      }
      quantity
      comment
      is_cancelled
      created_at
    }
  }
`;
