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
    return {};
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

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private orderService: OrderService,
    public dialog: MatDialog
  ) { super(); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transactionService.getTransaction(params['id']).subscribe(transaction => {
        console.log('transaction ', transaction);
        this.transaction = transaction;
      });

      this.orderService.getOrdersByTransaction(params['id']).subscribe(transactionOrders => {
        this.transactionOrders = transactionOrders;
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
        this.transactionOrders = [...this.transactionOrders, order];
      }
    });
  }

  calculateTotalSum(orderItems) {
    console.log('orderItems:', orderItems);
    return orderItems.reduce((sum, orderItem) => {
      return orderItem.Product.price * orderItem.quantity
    }, 0);
  }

  formatTransactionSummaryData(orders: Order[] = this.transactionOrders) {
    return this.transactionFactory.formatTransactionSummaryData(orders);
  }
}
