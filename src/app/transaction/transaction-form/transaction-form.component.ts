import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OptionItem } from '../../shared/custom-input/custom-input.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Vendor } from '../../core/services/models';
import { VendorService } from '../../core/services';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})


export class TransactionFormComponent extends BaseComponent implements OnInit {

  form: any;

  vendors: OptionItem[];


  constructor(
    private vendorService: VendorService,
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { super(); }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(vendor => {
      this.vendors = vendor.map(x => <OptionItem>{
        value: x.id.toString(),
        viewValue: x.name,
        image: x.image
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTransaction(form) {
    return form;
  }

}
