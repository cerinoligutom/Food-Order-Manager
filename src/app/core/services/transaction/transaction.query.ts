import gql from 'graphql-tag';
import { Transaction } from '../models';

export interface GetTransactionQueryResponse {
  Transactions: Transaction[];
}

export const GetTransactionsQuery = gql`
  query getTransactionsQuery {
    Transactions {
      id
      description
      delivery_fee
      Host {
        id
        username
      }
      Vendor {
        id
        name
        image
      }
    }
  }
`;
