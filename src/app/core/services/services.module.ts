import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorService, AuthService, UserService } from './index';
import { ProductService } from './product/product.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    VendorService,
    AuthService,
    UserService,
    ProductService
  ]
})
export class ServicesModule {
}
