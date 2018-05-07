import gql from "graphql-tag";
import { User, Role } from "../models";

export interface UserQueryResponse {
  User: User;
}

export interface UsersQueryResponse {
  Users: User[];
}

export interface RolesQueryResponse {
  Roles: Role[];
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

export const GetAllUsersQuery = gql`
  query GetAllUsers {
    Users {
      id
      username
      email
      image
      first_name
      middle_name
      last_name
      birthdate
      confirmed
      created_at
      is_active
      is_admin
    }
  }
`;

export const GetUserRoles = gql`
  query getAllRoles {
    Roles {
      id
      name
    }
  }
`;
