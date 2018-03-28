import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [AdminComponent, AddVendorComponent, AddProductComponent, ManageProductComponent],
  entryComponents: [AddVendorComponent, AddProductComponent, ManageProductComponent]
})
export class AdminModule { }
