import { Component, OnInit, Query } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TransactionFormComponent } from "../../transaction/transaction-form/transaction-form.component";

import gql from 'graphql-tag';

import { Vendor, VendorQuery } from '../../types';
import { VendorService } from '../../core/services/vendor/vendor.service';

@Component({
  selector: 'app-activity-area',
  templateUrl: './activity-area.component.html',
  styleUrls: ['./activity-area.component.scss']
})
export class ActivityAreaComponent implements OnInit {
  transactions: any[];
  today = Date.now();
  
  // PolarArea
  public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend:boolean = true;
 
  public polarAreaChartType:string = 'polarArea';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  // constructor(private apollo: Apollo) { }
  constructor(private apollo: Apollo, private _vendorService: VendorService){

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
