import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import { Transaction } from './transaction.model';
import {map} from 'rxjs/operators';
import {
  AddTransactionInput,
  AddTransactionMutation,
  TransactionMutationResponse
} from './transaction.mutation';

import gql from 'graphql-tag';
import { GetTransactionQueryResponse, GetTransactionsQuery } from './transaction.query';

@Injectable()
export class TransactionService {
  transaction: Transaction;

  constructor(private apollo: Apollo) { }

  getTransactions() {
    return this.apollo.watchQuery<GetTransactionQueryResponse>({
      query: GetTransactionsQuery
    }).valueChanges.pipe(
      map(result => result.data.Transactions)
    );
  }

  addTransaction(input: AddTransactionInput) {
    return this.apollo.mutate<TransactionMutationResponse>({
      mutation: AddTransactionMutation,
      variables: {
        addTransactionInput: input
      }
    })
    .pipe(
      map(result => result.data.Transaction)
    );
  }
}
