import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  TransactionService,
  OrderService,
  OrderItemService,
  UserService
} from "@app/services";
import { BaseComponent } from "@app/components";
import { Order } from "@app/models";
import { MatDialog } from "@angular/material";
import { AddOrderFormComponent } from "../add-order-form/add-order-form.component";
import { EditOrderItemFormComponent } from "../edit-order-item-form/edit-order-item-form.component";
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import * as _ from 'lodash';
import { UpdateOrderComponent } from "../update-order/update-order.component";

class TransactionFactory {
  formatTransactionSummaryData(orders: Order[]) {
    // TODO:
    // Restructure data for summary

    const productData = {};

    for (let order of orders) {
      // if (order.comment) {
      //   commentData.push({
      //     user: order.User,
      //     comment: order.comment
      //   });
      // }

      for (let orderItem of order.OrderItems) {
        if (productData[orderItem.Product.id]) {
          productData[orderItem.Product.id].quantity += orderItem.quantity;
        } else {
          productData[orderItem.Product.id] = {
            ...orderItem.Product,
            quantity: orderItem.quantity,
            comments: []
          };
        }

        if (orderItem.comment) {
          productData[orderItem.Product.id].comments.push(orderItem.comment);
        }
      }
    }

    let products = [];

    for (let productId in productData) {
      products.push(productData[productId]);
    }

    return {
      products: products,
      sum: this.calculateTotalSum(products)
    };
  }

  private calculateTotalSum(products: any[]) {
    return products.reduce((sum, product) => {
      return (sum += product.price * product.quantity);
    }, 0);
  }
}

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"]
})
export class TransactionComponent extends BaseComponent implements OnInit {
  transaction: any;
  icon: string;
  transactionOrders: Order[];
  orderIndex: number = -1;

  transactionFactory = new TransactionFactory();

  transactionSummary: any = {};

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    public dialog: MatDialog,
    private router: Router
  ) {
    super();

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transactionService
        .getTransaction(params["id"])
        .subscribe(transaction => {
          this.transaction = transaction;
        });

      this.orderService
        .getOrdersByTransaction(params["id"])
        .subscribe(transactionOrders => {
          this.transactionOrders = [...transactionOrders].reverse();
          this.checkExistingOrder();

          this.transactionSummary = this.formatTransactionSummaryData(
            transactionOrders
          );
          console.log("summary:", this.transactionSummary);
          console.log("transaction orders ", this.transactionOrders);
        });
    });
  }

  checkExistingOrder () {
    let currentUserId = this.currentLoggedInUser.id;

    this.orderIndex = _.findIndex(this.transactionOrders, (transaction) => { return transaction.User.id === currentUserId });
  }

  openUpdateOrderDialog(transactionId, vendorId, order) {
    const dialogRef = this.dialog.open(UpdateOrderComponent, {
      width: "1200px",
      data: {
        transactionId: transactionId,
        vendorId: vendorId,
        order: order
      }
    });

    dialogRef.afterClosed().subscribe(order => {
      if (order) {
        let usersOrder = this.transactionOrders[this.orderIndex];

        this.transactionOrders[this.orderIndex] = { ...this.transactionOrders[this.orderIndex] };

        this.transactionOrders[this.orderIndex].OrderItems = [...this.transactionOrders[this.orderIndex].OrderItems, ...order];

        this.transactionSummary = this.formatTransactionSummaryData(
          this.transactionOrders
        );
      }
    });
  }

  openAddOrderDialog(transactionId, vendorId) {
    const dialogRef = this.dialog.open(AddOrderFormComponent, {
      width: "1200px",
      data: {
        transactionId: transactionId,
        vendorId: vendorId,
      }
    });

    dialogRef.afterClosed().subscribe(order => {
      if (order) {
        this.transactionOrders = [...this.transactionOrders, order].reverse();
        this.transactionSummary = this.formatTransactionSummaryData(
          this.transactionOrders
        );
      }

      this.checkExistingOrder();
    });
  }

  calculateTotalSum(orderItems) {
    return orderItems.reduce((sum, orderItem) => {
      return orderItem.Product.price * orderItem.quantity;
    }, 0);
  }

  formatTransactionSummaryData(orders: Order[] = this.transactionOrders) {
    return this.transactionFactory.formatTransactionSummaryData(orders);
  }

  cancelOrder(orderId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      data: {
        message: "Are you sure you want to cancel your order?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.cancelOrder(orderId).subscribe(result => {
          // todo upon conversion to component modify received order items input
          // for now retrieve from api
          this.ngOnInit();
        });
      }
    });
  }

  showEditOrderItemDialog(orderItemId) {
    console.log("show edit order item dialog ID = ", orderItemId);
    const dialogRef = this.dialog.open(EditOrderItemFormComponent, {
      width: "720px",
      data: {
        orderItemId: orderItemId
      }
    });

    dialogRef.afterClosed().subscribe(orderItem => {
      if (orderItem) {
        this.orderItemService.editOrderItem(orderItem).subscribe(result => {
          console.log("edited", result);
          // todo upon conversion to component modify received order items input
          // for now retrieve from api
          this.ngOnInit();
        });
      }
    });
  }

  cancelOrderItem(orderItemId, order) {
    console.log("order items cancel", order);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      data: {
        message: "Are you sure you want to remove this item?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderItemService.cancelOrderItem(orderItemId).subscribe(result => {
          // todo upon conversion to component modify received order items input
          // for now retrieve from api
          this.ngOnInit();
        });
      }
    });
  }

  isFullyPaid(orderId, isFullyPaid) {
    isFullyPaid = !isFullyPaid;
    this.orderService
      .changeOrderFullyPaidStatus(orderId, isFullyPaid)
      .subscribe(result => {
        console.log("is fully paid ", result);
      });
  }

  changeTransactionStatus(transactionId, isFulfilled) {
    isFulfilled = !isFulfilled;

    this.transactionService
      .changeTransactionFulfilledStatus(transactionId, isFulfilled)
      .subscribe(result => {
        console.log("change transaction status", result);
      });
  }
}
