import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../core/services';
import { MatDialog } from '@angular/material';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from '../../core/services/product/product.service';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent extends BaseComponent implements OnInit {

  vendors: VendorAccordionItem[] = [];
  products: VendorAccordionItem[] = [];

  constructor(
    private vendorService: VendorService,
    private productService: ProductService,
    public dialog: MatDialog
  ) { super(); }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(vendor => {
      this.vendors = vendor.map(x => <VendorAccordionItem>{
        id: x.id,
        name: x.name,
        image: x.image
      });
    });

  }

  openAddVendorDialog(): void {
    const dialogRef = this.dialog.open(AddVendorComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vendorService.addVendor(result).subscribe(vendor => {
          this.vendors.push(vendor);
        });
      }
    });

  }

  onVendorExpand(vendorId){
    this.productService.getVendorProducts(vendorId).subscribe(result => {
      console.log('on vendor open',result);
    })
  }

  openAddProductDialog(vendorId):void{
    console.log('vendor id', vendorId);
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '300px',
      data: {
        vendorId: vendorId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result).subscribe(vendor => {
          console.log('create', vendor);
          this.products.push(vendor);
        });
      }
    });
  }

  updateVendor(form: any) {
    this.vendorService.editVendor(form).subscribe(vendor => {
      console.log('updated= ', vendor);
    });
  }
}

export class VendorAccordionItem {
  id: string;
  name: string;
  image: string;
}
