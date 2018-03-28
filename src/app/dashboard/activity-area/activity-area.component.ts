import { Component, OnInit, Query } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionFormComponent } from '../../transaction/transaction-form/transaction-form.component';
import { BaseComponent } from '@app/components';

import gql from 'graphql-tag';

import { AddTransactionInput } from '../../core/services/transaction/transaction.mutation';
import { Apollo } from 'apollo-angular';
import { VendorService, UserService, TransactionService } from '@app/services';

@Component({
  selector: 'app-activity-area',
  templateUrl: './activity-area.component.html',
  styleUrls: ['./activity-area.component.scss']
})
export class ActivityAreaComponent extends BaseComponent implements OnInit {
  transactions: any[];

  // constructor(private apollo: Apollo) { }
  constructor(
    private apollo: Apollo,
    private vendorService: VendorService,
    private userService: UserService,
    private transactionService: TransactionService,
    public dialog: MatDialog
  ) { super(); }
  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      width: '300px',
      data: {}
    });



    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.addTransaction(result).subscribe(transaction => {
          this.transactions = [transaction, ...this.transactions];
        })
      }
    });
  }

  ngOnInit() {
    this.getTransactions();

  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      console.log(this.transactions);

    });
  }
}
