import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { GetOrderQueryResponse, GetOrderQuery } from "./order.query";
import { map } from "rxjs/operators";
import {
  AddOrderInput,
  OrderMutationResponse,
  AddOrderMutation,
  CancelOrderMutation
} from "./order.mutation";
import {
  GetTransactionOrdersQueryResponse,
  GetTransactionOrders
} from "../transaction/transaction.query";

@Injectable()
export class OrderService {
  constructor(private apollo: Apollo) {}

  getOrdersByTransaction(transactionId) {
    return this.apollo
      .watchQuery<GetTransactionOrdersQueryResponse>({
        query: GetTransactionOrders,
        variables: {
          transactionId: transactionId
        }
      })
      .valueChanges.pipe(map(result => result.data.Transaction.Orders));
  }

  getOrder(orderId) {
    return this.apollo
      .watchQuery<GetOrderQueryResponse>({
        query: GetOrderQuery,
        variables: {
          orderId: orderId
        }
      })
      .valueChanges.pipe(map(result => result.data.Order));
  }

  addOrder(input: AddOrderInput) {
    return this.apollo
      .mutate<OrderMutationResponse>({
        mutation: AddOrderMutation,
        variables: {
          addOrderInput: input
        }
      })
      .pipe(map(result => result.data.Order));
  }

  cancelOrder(orderId) {
    return this.apollo
      .mutate<OrderMutationResponse>({
        mutation: CancelOrderMutation,
        variables: {
          orderId: orderId
        }
      })
      .pipe(map(result => result.data.Order));
  }
}
