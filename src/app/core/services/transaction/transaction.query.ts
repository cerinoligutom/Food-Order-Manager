import gql from 'graphql-tag';
import { Transaction } from '../models';

export interface GetTransactionsQueryResponse {
  Transactions: Transaction[];
}

export interface GetTransactionQueryResponse {
  Transaction: Transaction;
}

export const GetTransactionQuery = gql`
  query getTransaction{
    Transaction(id: "rys6An_cM"){
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
      }
      Vendor {
        id
        name
        image
      }
      Orders {
        id
      }
      created_at
    }
  }
`;
