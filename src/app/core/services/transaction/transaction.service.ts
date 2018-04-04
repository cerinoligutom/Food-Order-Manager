import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Transaction } from './transaction.model';
import { map } from 'rxjs/operators';
import {
  AddTransactionInput,
  AddTransactionMutation,
  TransactionMutationResponse
} from './transaction.mutation';

import gql from 'graphql-tag';
import { GetTransactionsQueryResponse, GetTransactionsQuery, GetTransactionQueryResponse, GetTransactionQuery } from './transaction.query';

@Injectable()
export class TransactionService {
  transaction: Transaction;

  constructor(private apollo: Apollo) { }

  getTransactions() {
    return this.apollo.watchQuery<GetTransactionsQueryResponse>({
      query: GetTransactionsQuery
    }).valueChanges.pipe(
      map(result => result.data.Transactions)
    );
  }

  getTransaction(transactionId) {
    return this.apollo.watchQuery<GetTransactionQueryResponse>({
      query: GetTransactionQuery,
      variables: {
        transactionId: transactionId
      }
    }).valueChanges.pipe(
      map(result => result.data.Transaction)
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
