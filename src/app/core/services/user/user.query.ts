import gql from 'graphql-tag';
import { User } from '../models';

export interface UserQueryResponse {
  User: User;
}

export const GetCurrentLoggedInUserQuery = gql`
  query getCurrentLoggedInUserQuery {
    User: me {
      id
      username
      hash
      first_name
      middle_name
      last_name
      full_name
      birthdate
      nickname
      email
      caption
      image
      confirmed
      created_at
      is_active
      last_active
    }
  }
`;

export const GetUserQuery = gql`
  query getUserQuery($id: ID!) {
    User(id: $id) {
      id
      username
      hash
      first_name
      middle_name
      last_name
      full_name
      birthdate
      nickname
      email
      caption
      image
      confirmed
      created_at
      is_active
      last_active
    }
  }
`;

export const GetUserOrdersQuery = gql`
query GetUserOrders($id: ID!) {
  User(id: $id) {
    id
    Orders {
      id
      created_at
      Transaction {
        id
      }
      OrderItems {
        id
        quantity
        Product {
          id
          name
          image
        }
      }
    }
  }
}
`;
