import { Component, OnInit, Query } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TransactionFormComponent } from "../../transaction/transaction-form/transaction-form.component";

import gql from 'graphql-tag';

import { Vendor, VendorQuery } from '../../types';
import { VendorService } from '../../core/services/vendor/vendor.service';
import { AddVendorInput } from '../../core/services/vendor/vendor.mutation'


@Component({
  selector: 'app-activity-area',
  templateUrl: './activity-area.component.html',
  styleUrls: ['./activity-area.component.scss']
})
export class ActivityAreaComponent implements OnInit {
  transactions: any[];
  today = Date.now();

  // PolarArea
  polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  polarAreaLegend: boolean = true;

  polarAreaChartType: string = 'polarArea';

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  // constructor(private apollo: Apollo) { }
  constructor(private apollo: Apollo, private _vendorService: VendorService, public dialog: MatDialog) { }
  openDialog(): void {
    let dialogRef = this.dialog.open(TransactionFormComponent, {
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
    this.transactions = [];
  }

  // addVendorInput: AddVendorInput = {
  //   name: 'Jollibee',
  //   image: 'http://business.inquirer.net/files/2012/01/Jollibee-logo-e1407489503307.jpg'
  // }

  // jollibee: any = {};
  // addJollibee() {
  //   this._vendorService.addVendor(this.addVendorInput).subscribe(vendor => {
  //     console.log('vendor:', vendor);
  //     this.jollibee = vendor;
  //   });
  // }
}
