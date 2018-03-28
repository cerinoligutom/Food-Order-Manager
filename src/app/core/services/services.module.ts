import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  VendorService,
  AuthService,
  UserService,
  TransactionService,
  ProductService
} from './index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    VendorService,
    AuthService,
    UserService,
    ProductService,
    TransactionService
  ]
})
export class ServicesModule {
}
