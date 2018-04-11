import gql from 'graphql-tag';
import { Order } from '../models';

export interface GetOrderQueryResponse {
  Order: Order;
}

export const GetOrderQuery = gql`
  query getOrderQuery($orderId: ID!){
    Order(id: $orderId){
      id
      OrderItems{
        id
        Product{
          id
          name
          price
          image
        }
        quantity
        is_cancelled
      }
      isFullyPaid
    }
  }
`;
