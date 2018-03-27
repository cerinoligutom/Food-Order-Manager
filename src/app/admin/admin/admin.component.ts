import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../core/services';
import { MatDialog } from '@angular/material';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  vendors: VendorAccordionItem[];

  constructor(
    private vendorService: VendorService,
    public dialog: MatDialog
  ) { }

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
