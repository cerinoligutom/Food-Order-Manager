import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '@app/services';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrls: ['./add-order-form.component.scss']
})
export class AddOrderFormComponent implements OnInit {

  vendorProducts: any;
  productCtrl: FormControl;
  filteredProducts: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<AddOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    this.productCtrl = new FormControl();
  }

  ngOnInit() {
    this.productService.getVendorProducts(this.data.vendorId).subscribe(result => {
      this.vendorProducts = result;
      this.filteredProducts = this.productCtrl.valueChanges.pipe(
        startWith(''),
        map(product => product ? this.filterProducts(product) : this.vendorProducts.slice())
      );
    });
  }

  filterProducts(name: string) {
    console.log('filter', name);
    return this.vendorProducts.filter(product => product.name.toLowerCase().indexof(name.toLowerCase()) === 0);
  }


}
