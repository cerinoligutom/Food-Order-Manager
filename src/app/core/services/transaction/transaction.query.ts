import gql from 'graphql-tag';
import { Transaction, TransactionOrders } from '../models';

export interface GetTransactionsQueryResponse {
  Transactions: Transaction[];
}

export interface GetTransactionQueryResponse {
  Transaction: Transaction;
}

export interface GetTransactionOrdersQueryResponse {
  Transaction: TransactionOrders;
}

export const GetTransactionQuery = gql`
  query getTransactionQuery($transactionId: ID!){
    Transaction(id: $transactionId){
      id
      created_at
      Host{
        id
        username
        full_name
        nickname
        image
      }
      Vendor{
        id
        name
        image
      }
    }
  }
`;


export const GetTransactionsQuery = gql`
  query getTransactionsQuery {
    Transactions {
      id
      description
      delivery_fee
      Host {
        id
        username
        image
        full_name
        last_active
      }
      Vendor {
        id
        name
        image
      }
      Orders {
        id
        created_at
        User {
          id
          image
          full_name
        }
      }
      created_at
    }
  }
`;

export const GetTransactionOrders = gql`
  query getTransactionOrdersQuery($transactionId: ID!){
    Transaction(id: $transactionId) {
      id
      Orders {
        id
        User{
          id
          full_name
          username
          nickname
          image
        }
        comment
        isFullyPaid
        OrderItems {
          id
          Order{
            id
            comment
            isFullyPaid
          }
          Product {
            id
            name
            image
            price
          }
          quantity
        }
      }
    }
  }
`;
