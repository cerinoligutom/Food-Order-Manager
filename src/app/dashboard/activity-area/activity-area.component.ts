import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TransactionFormComponent } from "../../transaction/transaction-form/transaction-form.component";

@Component({
  selector: 'app-activity-area',
  templateUrl: './activity-area.component.html',
  styleUrls: ['./activity-area.component.scss']
})
export class ActivityAreaComponent implements OnInit {
  transactions: any[];

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(TransactionFormComponent, {
      width: '300px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.transactions.push(result);
      console.log('transaction result', result);
    });
  }

  ngOnInit() {
    this.transactions = [];
  }






}
