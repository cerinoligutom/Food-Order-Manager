import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService, OrderService } from '@app/services';
import { BaseComponent } from '@app/components';
import { Order } from '@app/models';
import { MatDialog } from '@angular/material';
import { AddOrderFormComponent } from '../add-order-form/add-order-form.component';

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
      return sum += product.price * product.quantity
    }, 0)
  }
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent extends BaseComponent implements OnInit {

  transaction: any;
  transactionOrders: Order[];

  transactionFactory = new TransactionFactory();

  transactionSummary: any = {};

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private orderService: OrderService,
    public dialog: MatDialog
  ) { super(); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transactionService.getTransaction(params['id']).subscribe(transaction => {
        this.transaction = transaction;
      });

      this.orderService.getOrdersByTransaction(params['id']).subscribe(transactionOrders => {
        this.transactionOrders = [...transactionOrders].reverse();

        this.transactionSummary = this.formatTransactionSummaryData(transactionOrders);
        console.log('summary:', this.transactionSummary);
      })
    });

  }

  openAddOrderDialog(transactionId, vendorId) {
    const dialogRef = this.dialog.open(AddOrderFormComponent, {
      width: '1200px',
      data: {
        transactionId: transactionId,
        vendorId: vendorId
      }
    });

    dialogRef.afterClosed().subscribe(order => {
      if (order) {
        this.transactionOrders = [...this.transactionOrders, order].reverse();
        this.transactionSummary = this.formatTransactionSummaryData(this.transactionOrders);
      }
    });
  }

  calculateTotalSum(orderItems) {
    return orderItems.reduce((sum, orderItem) => {
      return orderItem.Product.price * orderItem.quantity
    }, 0);
  }

  formatTransactionSummaryData(orders: Order[] = this.transactionOrders) {
    return this.transactionFactory.formatTransactionSummaryData(orders);
  }
}
