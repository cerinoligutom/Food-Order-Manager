import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import {
  GetOrderItemQueryResponse,
  GetOrderItemQuery
} from "./order-item.query";
import { map } from "rxjs/operators";
import {
  OrderItemMutationResponse,
  EditOrderItemMutation
} from "./order-item.mutation";
import { EditOrderItemInput } from "@app/models";

class OrderItemFactory {
  toEditOrderItemRequest(orderItem: EditOrderItemInput){
    return {
      id: orderItem.id,
      quantity: orderItem.quantity,
      comment: orderItem.comment
    }
  }
}

@Injectable()
export class OrderItemService {
  private orderItemFactory = new OrderItemFactory();
  constructor(private apollo: Apollo) {}

  getOrderItemById(orderItemId) {
    return this.apollo
      .watchQuery<GetOrderItemQueryResponse>({
        query: GetOrderItemQuery,
        variables: {
          orderItemId: orderItemId
        }
      })
      .valueChanges.pipe(
        map(result => {
          console.log("result:", result);
          return result.data.OrderItem;
        })
      );
  }

  editOrderItem(input: EditOrderItemInput) {
    return this.apollo
      .mutate<OrderItemMutationResponse>({
        mutation: EditOrderItemMutation,
        variables: {
          editOrderItemInput: this.orderItemFactory.toEditOrderItemRequest(input)
        }
      })
      .pipe(map(result => result.data.OrderItem));
  }
}
