import gql from 'graphql-tag';
import { Transaction, Vendor } from '../models';

export interface AddTransactionInput {
  host_id: string;
  vendor_id: string;
  description: string;
  delivery_fee: number;
}

export interface TransactionMutationResponse {
  Transaction: Transaction;
}

export const AddTransactionMutation = gql`
  mutation addTransaction($addTransactionInput: AddTransactionInput) {
    Transaction: addTransaction(input: $addTransactionInput) {
      id
      created_at
      is_fulfilled
      Host {
        id
        username
        full_name
        nickname
        image
      }
      Vendor {
        id
        name
        image
      }
      description
      delivery_fee
    }
  }
`;
