import { Component, OnInit, Query } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionFormComponent } from '../../transaction/transaction-form/transaction-form.component';

import gql from 'graphql-tag';

@Component({
  selector: 'app-activity-area',
  templateUrl: './activity-area.component.html',
  styleUrls: ['./activity-area.component.scss']
})
export class ActivityAreaComponent implements OnInit {
  transactions: any[];

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.transactions.push(result);
      console.log('transaction result', result);
    });
  }

  ngOnInit() {
    this.transactions = [
      {
        id: '1',
        Host: {
          id: '1',
          username: 'zeferinix',
        },
        Vendor: {
          id: '1',
          name: 'Jollibee'
        },
        description: 'The big brown fox',
        created_at: new Date(),
        delivery_fee: 40.0
      },
      {
        id: '1',
        Host: {
          id: '1',
          username: 'zeferinix',
        },
        Vendor: {
          id: '1',
          name: 'Jollibee'
        },
        description: 'The big brown fox',
        created_at: new Date(),
        delivery_fee: 40.0
      },
      {
        id: '1',
        Host: {
          id: '1',
          username: 'zeferinix',
        },
        Vendor: {
          id: '1',
          name: 'Jollibee'
        },
        description: 'The big brown fox',
        created_at: new Date(),
        delivery_fee: 40.0
      }
    ];
  }
}
