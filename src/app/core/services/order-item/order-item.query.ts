import gql from 'graphql-tag';
import { OrderItem } from '../models';


export interface GetOrderItemQueryResponse {
  OrderItem: OrderItem
}

export const GetOrderItemQuery = gql`
query getOrderItem($orderItemId: ID!){
  OrderItem(id: $orderItemId){
    id
    Product{
      id
      name
      price
      image
    }
    quantity
    comment
  }
}
`;
